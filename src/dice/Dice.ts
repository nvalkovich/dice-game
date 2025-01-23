export class Dice {
    public readonly id: number;
    public readonly faces: Array<number>;

    constructor(id: number, faces: Array<number>) {
        this.id = id;
        this.faces = faces;
    }

    public toString(): string {
        return JSON.stringify(this.faces);
    }
}
