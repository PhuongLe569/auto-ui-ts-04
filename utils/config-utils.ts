import * as dotenv from 'dotenv';

export function getEnv(name: string) {
    let currentEnv = 'local';
    if(!!process.env.TEST_ENV) {
        currentEnv = process.env.TEST_ENV;
    } 
    dotenv.config({
        path: 'env/.env.local'
    });
    return process.env[name] ?? '';
}