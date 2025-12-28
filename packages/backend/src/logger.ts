import pino from "pino";
import {LOG_LEVEL, SENTRY_DEVICE_NAME, SENTRY_DSN, SENTRY_ENVIRONMENT} from "./config";
import * as Sentry from "@sentry/bun";

export const logger = pino({
    level: LOG_LEVEL,
    transport: SENTRY_DSN
        ? {
            target: 'pino-sentry-transport',
            options: {
                dsn: SENTRY_DSN,
                environment: SENTRY_ENVIRONMENT,
                integrations: [Sentry.bunServerIntegration()],
                serverName: SENTRY_DEVICE_NAME
            }
        }
        : undefined
})
