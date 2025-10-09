// ensures the best dev experience
// basically type-checking environment variables, making sure the dev has everything required 
import { env as loadEnv } from 'custom-env';
import { z } from 'zod';

process.env.APP_STAGE = process.env.APP_STAGE || 'dev';