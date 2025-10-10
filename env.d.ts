declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // Database
            DATABASE_URL: string;
            
            // Server
            PORT?: string;
            NODE_ENV?: 'development' | 'production' | 'test';
            APP_STAGE?: 'development' | 'production' | 'test' | 'dev';
            
            // Auth
            JWT_SECRET: string;
            JWT_EXPIRES_IN?: string;
            
            // Add all your env variables here
            API_KEY?: string;
            // etc...
        }
    }
}

export {};