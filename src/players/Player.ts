import { Dice } from '../dice/Dice';

export enum PlayersNames {
    computer = 'computer',
    human = 'human',
}

export abstract class Player {
    public readonly name: PlayersNames;
    public dice: Dice;

    constructor(name: PlayersNames) {
        this.name = name;
    }

    abstract selectDice(availableDice: Dice[], firstPlayerName: PlayersNames): void;

    protected formatDice(dice) {
        return JSON.stringify(dice.faces);
    }
}
