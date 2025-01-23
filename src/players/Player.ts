import { Dice } from '../dice/Dice';

export enum PlayersNames {
    computer = 'computer',
    human = 'human',
}

export abstract class Player {
    public readonly name: PlayersNames;
    public dice: Dice;
    public throwResult?: number;

    protected constructor(name: PlayersNames) {
        this.name = name;
    }

    abstract selectDice(
        availableDice: Dice[],
        firstPlayerName: PlayersNames,
    ): void;

    public setResult(faceIndex: number) {
        this.throwResult = this.dice.faces[faceIndex];
    }
}
