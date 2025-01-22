import { createHmac } from 'crypto';

export class HMACGenerator {
    static generateHMAC(number: number, key: string): string {
        const hmac = createHmac('sha3-256', Buffer.from(key, 'hex'));
        hmac.update(number.toString());
        return hmac.digest('hex');
    }
}
