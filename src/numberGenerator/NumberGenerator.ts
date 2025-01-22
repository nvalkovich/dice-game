import { FairNumber } from './FairNumber';
import { randomInt } from 'crypto';
import { KeyGenerator } from './KeyGenerator';
import { HMACGenerator } from './HMACGenerator';

export class NumberGenerator {
    static generateNumber(max: number): number {
        return randomInt(0, max);
    }

    static generateFairNumber(max: number): FairNumber {
        const randomNumber = NumberGenerator.generateNumber(max);
        const key = KeyGenerator.generateKey();
        const hmac = HMACGenerator.generateHMAC(randomNumber, key);

        return new FairNumber(randomNumber, key, hmac);
    }
}
