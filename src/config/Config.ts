import { Dice } from '../dice/Dice';

export class Config {
    public readonly dices: Array<Dice>;

    constructor(dices: Array<Dice>) {
        this.dices = dices;
    }
}
