import { FairNumber } from './FairNumber';
import { randomInt } from 'crypto';
import { KeyGenerator } from './KeyGenerator';
import { HMACGenerator } from './HMACGenerator';

export class NumberGenerator {
    public static generateFairNumber(max: number): FairNumber {
        const randomNumber = randomInt(0, max);
        const key = KeyGenerator.generateKey();
        const hmac = HMACGenerator.generateHMAC(randomNumber, key);

        return new FairNumber(randomNumber, key, hmac);
    }
}
