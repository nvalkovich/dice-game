import { randomBytes } from 'crypto';

const RANDOM_KEY_LENGTH_BYTES = 32;

export class KeyGenerator {
    static generateKey(): string {
        return randomBytes(RANDOM_KEY_LENGTH_BYTES).toString('hex');
    }
}
