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
        console.log(
            resources.dice.getComputerChooseDiceMessage(
                firstPlayerName === this.name,
                this.formatDice(this.dice),
            ),
        );
    }

    public generateRandomChoice(maxValue): FairNumber {
        const fairNumber = NumberGenerator.generateFairNumber(maxValue);

        const startValue = 0;

        console.log(
            resources.common.getComputerSelectedValueMessage(
                startValue,
                maxValue - 1,
                fairNumber.hmac,
            ),
        );

        return fairNumber;
    }
}
