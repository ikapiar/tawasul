import {describe, it, expect} from "bun:test";
import {readFileSync} from "node:fs";
import {join} from "node:path";

import {AlumniService, InvalidAlumniSurveyCSVHeaders, RequiredAlumniSurveyCSVHeaders} from "../src/services/AlumniService";

describe("AlumniService.parseSurveyCSV", () => {
  const svc = new AlumniService();

  it("parses the provided CSV file and returns records with required headers", async () => {
    const csvPath = join(import.meta.dir, "../assets/form_alumni_2025.csv");
    const csvText = readFileSync(csvPath, "utf8");

    const records = await svc.parseSurveyCSV(csvText);

    expect(records.length).toBeGreaterThan(0);

    // Ensure each record has required headers
    for (const rec of records) {
      for (const header of RequiredAlumniSurveyCSVHeaders) {
        expect(Object.keys(rec)).toContain(header);
      }
    }

    // Spot-check the first row from assets (hard-coded expectations)
    const first = records[0];
    expect(first['Nama Lengkap']).toBe('Imam Mursyid');
    expect(first['Angkatan']).toBe('2. Radar');
    expect(first['Nomor Kontak']).toBe('082283243203');
    expect(first['Email']).toBe('mursyid28101993@gmail.com');
  });

  it("rejects when required headers are missing", async () => {
    const invalidCsv = [
      // Missing 'Email' header
      'Timestamp,Nama Lengkap,Angkatan,Nomor Kontak',
      '01/01/2025 00:00:00,John Doe,Test,08123456789'
    ].join("\n");

      expect(svc.parseSurveyCSV(invalidCsv)).rejects.toBeInstanceOf(InvalidAlumniSurveyCSVHeaders);
  });
});
