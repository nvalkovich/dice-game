import { Player, PlayersNames } from './Player';
import { Dice } from '../dice/Dice';
import { resources } from '../common/resources';

export class HumanPlayer extends Player {
    private readonly promptUserChoice: <T>(options: T[], message: string) => T;

    constructor(promptUserChoice: <T>(options: T[], message: string) => T) {
        super(PlayersNames.human);
        this.promptUserChoice = promptUserChoice;
    }

    selectDice(availableDice: Dice[], firstPlayer: string): void {
        if (firstPlayer === this.name) {
            console.log(resources.firstMove.userMakesFirstMove);
        }

        this.dice = this.promptUserChoice(
            availableDice,
            resources.menu.chooseDiceMessage,
        );

        console.log(
            resources.dice.getUserChooseDiceMessage(Dice.formatDice(this.dice)),
        );
    }
}
