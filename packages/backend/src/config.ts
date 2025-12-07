
export const POSTGRESQL_URI = process.env.POSTGRESQL_URI ?? 'postgresql://postgres:mysecretpassword@localhost/postgres';
export const GOOGLE_OAUTH_LOGIN_PAGE_URL = 'https://accounts.google.com/o/oauth2/auth'
export const GOOGLE_OAUTH_TOKEN_EXCHANGE_URL = 'https://oauth2.googleapis.com/token';
export const GOOGLE_API_USER_INFO_URL = 'https://www.googleapis.com/userinfo/v2/me'
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
export const JWT_PRIVATE_KEY = process.env['JWT_PRIVATE_KEY'] ?? `
-----BEGIN PRIVATE KEY-----
MIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIAgV9w+QgogrIfYlWv
vPvs5PMq90F/bbQrcHr9Duyksif7OdcYwaMGUBRZr6zgisbYWH4QvhzQ8eF8ZWpT
RONoUxWhgYkDgYYABAF6sLCF0nosnWIH1xWMCL8UCx7d8OUMF9taIHd9EJo5jboY
aB93GWBQQt4cS1v3ieh0WAW8sgetp21YP2Q/oEwQHgHvMJs/UDPuX74xa7k1Nelb
lBRrNagZOEIu2+2sgqUPUp5sOujSl5r+wGU57360Zd58A+V5h4bXS3aAnAyf09yR
Dg==
-----END PRIVATE KEY-----
`;
export const JWT_PUBLIC_KEY = process.env['JWT_PUBLIC_KEY'] ?? `
-----BEGIN PUBLIC KEY-----
MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQBerCwhdJ6LJ1iB9cVjAi/FAse3fDl
DBfbWiB3fRCaOY26GGgfdxlgUELeHEtb94nodFgFvLIHradtWD9kP6BMEB4B7zCb
P1Az7l++MWu5NTXpW5QUazWoGThCLtvtrIKlD1KebDro0pea/sBlOe9+tGXefAPl
eYeG10t2gJwMn9PckQ4=
-----END PUBLIC KEY-----
`;
export const JWT_ALGORITHM = 'ES512';
export const JWT_MAX_AGE_SECONDS = 604800; // 7 days

export const UNIVERSAL_TOKEN = process.env['UNIVERSAL_TOKEN'] ?? 'adalah_token';

export const IKAPIAR_ADMIN_EMAIL = process.env.IKAPIAR_ADMIN_EMAIL ?? 'admin@ikapiar'
export const IKAPIAR_CONTACT_EMAIL = process.env.IKAPIAR_CONTACT_EMAIL ?? 'contact@ikapiar'

export const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL ?? 'http://localhost:5173'