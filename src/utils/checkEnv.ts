export function checkEnv(envs: string[]) {
  const missingEnvs = envs.filter(env => !process.env[env]);
  if (missingEnvs.length > 0) {
    throw new Error(`Missing environment variables: ${missingEnvs.join(", ")}`);
  }
}
