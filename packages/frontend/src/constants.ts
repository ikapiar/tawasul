export const BACKEND_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'
export const GOOGLE_LOGIN_URL = `${BACKEND_BASE_URL}/api/v1/auth/login/google`