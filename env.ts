// ensures the best dev experience
// basically type-checking environment variables, making sure the dev has everything required 
//@ts-ignore - reason: lazy, need to stay on track right now.
import { env as loadEnv } from 'custom-env';
import { z } from 'zod';

// process.env.APP_STAGE = process.env.APP_STAGE || 'dev';
// ** REMEMBER TO CHECK THIS FIRST SO U ACTUALLY KNOW WHAT ENV YOU'RE USING ** 
console.log('loaded env.ts')
process.env.APP_STAGE = 'dev';

const isProduction = process.env.APP_STAGE === 'production';
const isDevelopment = process.env.APP_STAGE === 'development' || process.env.APP_STAGE === 'dev';
const isTesting = process.env.APP_STAGE === 'test';

if (isDevelopment) {
  loadEnv('dev');
} else if (isTesting) {
  loadEnv('test');
} else {
  loadEnv('example')
}

// using zod to validate our environment variables
// very neat stuff! but verbose lol
// but this is something a devEx team would work on
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'dev', 'production']).default('development'),
  APP_STAGE: z.enum(['development', 'test', 'dev', 'production']).default('dev'),
  ALLOWED_ORIGINS: z.string(),
  // PORT: z.number('3000')
  PORT: z.coerce.number().positive().default(3000), // wtf is this why is it so verbose
  DATABASE_URL: z.string().startsWith('postgresql://'),
  JWT_SECRET: z.string().min(32, 'Must be 32 chars long'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),
});

export type Env = z.infer<typeof envSchema>; // very cool but also wtf
// writing all types in zod instead of typescript. more robust, sure. but what's the justification?
let env: Env;

try {
  // console.log(process.env);
  env = envSchema.parse(process.env)
} catch (e) {
  if (e instanceof z.ZodError) {
    console.log('invalid env var');
    console.error(JSON.stringify(e.flatten().fieldErrors, null, 2));

    e.issues.forEach((err) => {
      const path = err.path.join('.');
      console.log(`${path}: ${err.message}`);
    });
    process.exit(1);
  }

  throw e;
}

export const isProd = () => env.APP_STAGE === 'production';
export const isDev = () => env.APP_STAGE === 'dev';
export const isTest = () => env.APP_STAGE === 'test';

export { env };
export default env;