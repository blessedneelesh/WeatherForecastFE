// API keys and tokens must be injected from a secret store at runtime
// (e.g. Azure Key Vault, AWS Secrets Manager). Never commit them — .env files
// here hold only non-sensitive endpoint URLs that are safe to bake into the bundle.

interface AppEnv {
  WEATHER_API_BASE_URL: string;
}

function requireEnv(key: string): string {
  const value = import.meta.env[key];
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env: AppEnv = {
  WEATHER_API_BASE_URL: requireEnv('REACT_APP_WEATHER_API_BASE_URL'),
};
