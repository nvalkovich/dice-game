import { Dice } from '../Dice';

export class Config {
    public readonly faces: Array<Dice> = [];

    constructor(faces: Array<Dice>) {
        this.faces = faces;
    }
}
