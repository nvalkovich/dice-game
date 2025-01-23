import { Player, PlayersNames } from './Player';
import { Dice } from '../dice/Dice';
import { menuMessages } from '../console/Console';

export class HumanPlayer extends Player {
    private readonly promptUserChoice: <T>(options: T[], message: string) => T;

    constructor(promptUserChoice: <T>(options: T[], message: string) => T) {
        super(PlayersNames.human);
        this.promptUserChoice = promptUserChoice;
    }

    selectDice(availableDice: Dice[], firstPlayer: string): void {
        if (firstPlayer === this.name) {
            console.log('You make the first move.');
        }

        this.dice = this.promptUserChoice(availableDice, menuMessages.chooseDiceMessage);
        console.log(`You chose ${Dice.formatDice(this.dice)} dice.`);
    }
}
