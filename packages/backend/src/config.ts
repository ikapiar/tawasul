
export const POSTGRESQL_URI = process.env.POSTGRESQL_URI ?? 'postgresql://postgres:mysecretpassword@localhost/postgres';
export const GOOGLE_OAUTH_LOGIN_PAGE_URL = process.env['GOOGLE_OAUTH_LOGIN_PAGE_URL'] ?? 'https://accounts.google.com/o/oauth2/auth'
export const GOOGLE_OAUTH_TOKEN_EXCHANGE_URL = process.env['GOOGLE_OAUTH_TOKEN_EXCHANGE_URL'] ?? 'https://oauth2.googleapis.com/token';
export const GOOGLE_API_USER_INFO_URL = process.env['GOOGLE_API_USER_INFO_URL'] ?? 'https://www.googleapis.com/userinfo/v2/me'
export const GOOGLE_OAUTH_SCOPES = [
	'https://www.googleapis.com/auth/userinfo.email'
]
export const GOOGLE_OAUTH_REDIRECT_URL = process.env['GOOGLE_OAUTH_REDIRECT_URL'] ?? 'http://localhost:3000/api/v1/auth/callback/google'
export const GOOGLE_OAUTH_CLIENT_ID = process.env['GOOGLE_OAUTH_CLIENT_ID'] ?? 'ganti';
export const GOOGLE_OAUTH_CLIENT_SECRET = process.env['GOOGLE_OAUTH_CLIENT_SECRET'] ?? 'ganti';
export const OAUTH_CSRF_PARAM_NAME = 'oauth_csrf_token';
export const OAUTH_CSRF_PARAM_VALUE = process.env['OAUTH_CSRF_PARAM_VALUE'] ?? 'tawasul';
export const SYMMETRIC_ENCRYPTION_KEY_ALGORITHM = 'aes-256-cbc';
export const SYMMETRIC_ENCRYPTION_KEY_SECRET = process.env['SYMMETRIC_ENCRYPTION_KEY_SECRET'] ?? 'RANDOM_32_BYTES_ASCII_CHARACTERS';
export const SYMMETRIC_ENCRYPTION_KEY_IV = process.env['SYMMETRIC_ENCRYPTION_KEY_IV'] ?? 'RANDOM_16_BYTES_';
export const JWT_PRIVATE_KEY_BASE64 = process.env['JWT_PRIVATE_KEY_BASE64'] ?? `error`;
export const JWT_PUBLIC_KEY_BASE64 = process.env['JWT_PUBLIC_KEY_BASE64'] ?? `error`;
export const JWT_ALGORITHM = 'ES512';
export const JWT_MAX_AGE_SECONDS = 604800; // 7 days

// all api access token
export const UNIVERSAL_TOKEN_HEADER_KEY = process.env['UNIVERSAL_TOKEN_HEADER_KEY'] ?? 'UNIVERSAL_TOKEN';
export const UNIVERSAL_TOKEN = process.env['UNIVERSAL_TOKEN'] ?? 'adalah_token';

export const IKAPIAR_ADMIN_EMAIL = process.env.IKAPIAR_ADMIN_EMAIL ?? 'admin@ikapiar'
export const IKAPIAR_CONTACT_EMAIL = process.env.IKAPIAR_CONTACT_EMAIL ?? 'contact@ikapiar'

export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL ?? 'http://localhost:5173'
export const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:3000'

// telemetry
export const SENTRY_DSN = process.env.SENTRY_DSN
export const SENTRY_ENVIRONMENT = process.env.SENTRY_ENVIRONMENT ?? process.env.NODE_ENV ?? 'development'