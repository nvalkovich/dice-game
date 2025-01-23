export class Dice {
    public readonly id: number;
    public readonly faces: ReadonlyArray<number>;

    constructor(id: number, faces: ReadonlyArray<number>) {
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
