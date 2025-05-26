import { expect } from "@playwright/test";

export const notiData = [
    {
        input: 'Success',
        expected: 'SUCCESS'
    },
    {
        input: 'Info',
        expected: 'INFO'
    },
    {
        input: 'Warning',
        expected: 'WARNING'
    },
    {
        input: 'Error',
        expected: 'ERROR'
    }
];
