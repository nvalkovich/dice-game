import { randomBytes } from 'crypto';

export class KeyGenerator {
    static generateKey(): string {
        return randomBytes(32).toString('hex');
    }
}
