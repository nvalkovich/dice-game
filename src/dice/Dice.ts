export class Dice {
    public readonly id: number;
    public readonly faces: Array<number>;

    constructor(id: number, faces: Array<number>) {
        this.id = id;
        this.faces = faces;
    }

    static formatDice(dice: Dice): string {
        return JSON.stringify(dice.faces);
    }

    public toString(): string {
        return Dice.formatDice(this);
    }
}
