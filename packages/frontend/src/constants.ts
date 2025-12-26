const getEnv = (key: string, defaultValue: string): string => {
  // @ts-ignore
  if (window.env && window.env[key]) {
    // @ts-ignore
    return window.env[key];
  }
  // Fallback to build-time (useful for local dev if not using the config.js injection)
  return import.meta.env[key] ?? defaultValue;
};

export const BACKEND_BASE_URL: string = getEnv('VITE_API_BASE_URL', 'http://localhost:3000')
export const GOOGLE_LOGIN_URL = `${BACKEND_BASE_URL}/api/v1/auth/login/google`