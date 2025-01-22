export class FairNumber {
    public readonly number: number;
    public readonly key: string;
    public readonly hmac: string;

    constructor(number, key, hmac) {
        this.number = number;
        this.key = key;
        this.hmac = hmac;
    }
}
