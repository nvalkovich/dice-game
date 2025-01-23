import { createHmac } from 'crypto';

const HASH_ALGORITHM = 'sha3-256';

export class HMACGenerator {
    static generateHMAC(number: number, key: string): string {
        const hmac = createHmac(HASH_ALGORITHM, Buffer.from(key, 'hex'));
        hmac.update(number.toString());
        return hmac.digest('hex');
    }
}
