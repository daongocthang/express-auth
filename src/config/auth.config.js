import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

export default {
    TOKEN_SECRET,
    COOKIE_SECRET,
};
