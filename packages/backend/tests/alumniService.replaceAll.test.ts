import {describe, it, expect} from "bun:test";
import {GenericContainer, Wait, StartedTestContainer} from "testcontainers";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import {Client} from "pg";
import {AlumniService} from "../src/services/AlumniService";

describe("AlumniService.replaceAllSurveyData (integration)", () => {
  it("replaces all existing survey rows with parsed CSV data", async () => {
    let container: StartedTestContainer | undefined;
    let pgClient: Client | undefined;
    const originalUri = process.env.POSTGRESQL_URI;
    try {
      // Always use Dockerized Postgres for this integration test
      container = await new GenericContainer("postgres:16")
        .withEnvironment({
          POSTGRES_DB: "testdb",
          POSTGRES_USER: "testuser",
          POSTGRES_PASSWORD: "testpass",
        })
        .withExposedPorts(5432)
        .withWaitStrategy(Wait.forLogMessage(/database system is ready to accept connections/i))
        .withStartupTimeout(180_000)
        .start();

      const host = container.getHost();
      const port = container.getMappedPort(5432);
      const dbName = "testdb";
      const user = "testuser";
      const password = "testpass";
      const containerUri = `postgresql://${user}:${password}@${host}:${port}/${dbName}`;

      // Ensure the service under test uses the container DB
      process.env.POSTGRESQL_URI = containerUri;

      // Give Postgres a moment after the ready log for accepting connections
      await new Promise(r => setTimeout(r, 1000));
      console.info(`[alumniService IT] Using Dockerized Postgres at ${host}:${port}`);

      // Prepare schema using pg client with simple retry (new client per attempt)
      let connected = false;
      let attempts = 0;
      while (!connected && attempts < 60) {
        let candidate: Client | undefined;
        try {
          candidate = new Client({ connectionString: containerUri });
          await candidate.connect();
          pgClient = candidate;
          connected = true;
        } catch {
          attempts++;
          try { await candidate?.end(); } catch { /* empty */ }
          await new Promise(r => setTimeout(r, 1000));
        }
      }
      if (!connected) {
        throw new Error("Integration test could not connect to Dockerized Postgres within time limit. Ensure Docker daemon is running.");
      }

      // Narrow type: from here on, pgClient must be defined
      if (!pgClient) {
        throw new Error("pgClient was not initialized despite successful connection attempt.");
      }
      const client = pgClient;

      await client.query(`
        CREATE TABLE IF NOT EXISTS "alumniSurvey" (
          id SERIAL PRIMARY KEY,
          "timestamp" TIMESTAMPTZ NOT NULL DEFAULT now(),
          "namaLengkap" VARCHAR(255) NOT NULL,
          "angkatan" VARCHAR(255) NOT NULL,
          "nomorKontak" VARCHAR(255) NOT NULL,
          "email" VARCHAR(255) NOT NULL,
          "formValues" JSON
        );
      `);

      const svc = new AlumniService();

      const csvPath = join(import.meta.dir, "../assets/form_alumni_2025.csv");
      const csvText = readFileSync(csvPath, "utf8");

      const parsed = await svc.parseSurveyCSV(csvText);
      // Pre-insert a dummy row to verify replacement (delete-all) behavior
      await client.query(`INSERT INTO "alumniSurvey" ("timestamp", "namaLengkap", "angkatan", "nomorKontak", "email") VALUES (now(), 'Dummy', 'X', '0', 'dummy@example.com')`);

      await svc.replaceAllSurveyData(parsed);

      const countRes = await client.query<{ count: string }>(`SELECT COUNT(*)::text as count FROM "alumniSurvey"`);
      const total = Number(countRes.rows[0].count);
      expect(total).toBe(parsed.length);

      // Spot check a known row by email
      const email = 'mursyid28101993@gmail.com';
      const rowRes = await client.query(`SELECT "namaLengkap", "angkatan", "formValues" as fv FROM "alumniSurvey" WHERE "email" = $1`, [email]);
      expect(rowRes.rowCount).toBe(1);
      const row = rowRes.rows[0] as { namaLengkap: string; angkatan: string; fv?: unknown };
      expect(row.namaLengkap).toBe('Imam Mursyid');
      expect(row.angkatan).toBe('2. Radar');
      expect(row.fv).toBeDefined();
        // eslint-disable-next-line no-useless-catch
    } catch (err) {
      // Surface any Docker or connection errors
      throw err;
    } finally {
      if (pgClient) {
        try { await pgClient.end(); } catch { /* empty */ }
      }
      if (container) {
        try { await container.stop(); } catch { /* empty */ }
      }
      // Restore original DB URI to avoid side effects on other tests
      if (originalUri === undefined) {
        delete process.env.POSTGRESQL_URI;
      } else {
        process.env.POSTGRESQL_URI = originalUri;
      }
    }
  }, 180000);
});
