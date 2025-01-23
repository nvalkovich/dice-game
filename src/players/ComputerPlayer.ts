import { Player, PlayersNames } from './Player';
import { Dice } from '../dice/Dice';
import { NumberGenerator } from '../numberGenerator/NumberGenerator';
import { FairNumber } from '../numberGenerator/FairNumber';

export class ComputerPlayer extends Player {
    constructor() {
        super(PlayersNames.computer);
    }

    selectDice(availableDice: Dice[], firstPlayerName?: PlayersNames): void {
        const randomIndex = NumberGenerator.generateNumber(availableDice.length);
        this.dice = availableDice[randomIndex];

        console.log(
            `${firstPlayerName === this.name ? 'I make the first move and' : 'I'} choose ${this.formatDice(this.dice)} dice.`,
        );
    }

    public generateRandomChoice(maxValue): FairNumber {
        const fairNumber = NumberGenerator.generateFairNumber(maxValue);

        const startValue = 0;
        console.log(
            `I selected a random value in the range ${startValue}..${maxValue - 1} (HMAC=${fairNumber.hmac.toUpperCase()})`,
        );

        return fairNumber;
    }
}
