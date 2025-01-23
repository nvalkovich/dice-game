import { Player, PlayersNames } from './Player';
import { Dice } from '../dice/Dice';
import { NumberGenerator } from '../numberGenerator/NumberGenerator';
import { FairNumber } from '../numberGenerator/FairNumber';
import { ProbabilityCalculator } from '../probabilityCalculator/ProbabilityCalculator';
import { resources } from '../common/resources';

export class ComputerPlayer extends Player {
    constructor() {
        super(PlayersNames.computer);
    }

    selectDice(availableDice: Dice[], firstPlayerName?: PlayersNames): void {
        this.dice = ProbabilityCalculator.findBestDice(availableDice);
        const isFirstPlayer = firstPlayerName === this.name;

        const message = [
            `${resources.messages.i} `,
            isFirstPlayer ? `${resources.messages.makeTheFirstMove} ` : '',
            resources.messages.getChooseDice(this.dice.toString()),
        ].join('');

        console.log(message);
    }

    public generateRandomChoice(maxValue): FairNumber {
        const fairNumber = NumberGenerator.generateFairNumber(maxValue);

        const rangeStart = 0;
        const rangeEnd = maxValue - 1;

        console.log(
            resources.messages.getISelectedRandomValue(
                rangeStart,
                rangeEnd,
                fairNumber.hmac,
            ),
        );

        return fairNumber;
    }
}
