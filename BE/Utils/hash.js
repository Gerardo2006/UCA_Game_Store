import bcrypt from 'bcrypt';
import { HASH_COMPLEXITY } from '../Keys/keys.js';

export const generateHash = async (password) => {
    return await bcrypt.hash(password, HASH_COMPLEXITY);
};

export const compareHash = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};