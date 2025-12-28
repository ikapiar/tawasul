import * as Sentry from "@sentry/bun";
import {SENTRY_DSN, SENTRY_ENVIRONMENT} from "./config";
import {logger} from "./logger";
import {Elysia} from "elysia";
import {opentelemetry} from "@elysiajs/opentelemetry";

export function telemetry() {
    if (SENTRY_DSN) {
        Sentry.init({
            dsn: SENTRY_DSN,
            environment: SENTRY_ENVIRONMENT,
            integrations: [Sentry.bunServerIntegration()]
        });
        return new Elysia()
            .use(opentelemetry())
            .onError(
                { as: 'global' },
                ({ error }) => { Sentry.captureException(error) }
            )
    } else {
        logger.warn("SENTRY_DSN not set, telemetry will not be enabled")
        return new Elysia()
    }
}