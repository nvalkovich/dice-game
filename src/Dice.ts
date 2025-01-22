export class Dice {
    public readonly id: number;
    public readonly faces: ReadonlyArray<number>;

    constructor(id: number, faces: ReadonlyArray<number>) {
        this.id = id;
        this.faces = faces;
    }

    public getFace(faceIndex: number) {
        return this.faces[faceIndex];
    }

    public toString(): string {
        return this.faces.toString();
    }
}
