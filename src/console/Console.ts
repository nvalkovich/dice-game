import readlineSync from 'readline-sync';
import { Player, PlayersNames } from '../players/Player';
import { DICE_FACES_COUNT } from '../common/constants';
import { FairNumber } from '../numberGenerator/FairNumber';

export enum menuMessages {
    firstMoveMessage = 'Try to guess my selection. ',
    chooseDiceMessage = 'Choose your dice: ',
    addNumberMessage = `Add your number modulo ${DICE_FACES_COUNT}.`,
}

export class Console {
    public askQuestion<T>(
        question: string,
        options: Array<T>,
        getOptionName: (option: T) => string,
    ): T {
        this.writeMenu(question, options.map(getOptionName));

        while (true) {
            const input = readlineSync.question('Your selection: ').trim().toUpperCase();
            const index = parseInt(input, 10);

            if (!isNaN(index) && index >= 0 && index < options.length) {
                return options[index];
            }

            console.log('Invalid value. Please, select a value from the list above.');
        }
    }

    private generateMenu(question: string, options: string[]): string {
        const exitOption = 'Х - exit';
        const helpOption = '? - help';

        const formattedOptions = options.map((option, index) => `${index} - ${option}`).join('\n');
        return [question, formattedOptions, exitOption, helpOption].join('\n');
    }

    private writeMenu(question: string, options: string[]) {
        const menu = this.generateMenu(question, options);
        console.log(menu);
    }

    public announceFirstMove() {
        console.log(`Let's determine who makes the first move.`);
    }

    public writeComputerSelection(fairNumber: FairNumber) {
        console.log(`My selection: ${fairNumber.number} (KEY=${this.uppercase(fairNumber.key)}).`);
    }

    public writeComputerNumber(fairNumber: FairNumber) {
        console.log(`My number is ${fairNumber.number} (KEY=${this.uppercase(fairNumber.key)}).`);
    }

    public announceThrow(currentPlayerName: string) {
        console.log(
            `It's time for ${currentPlayerName === PlayersNames.computer ? 'my' : 'your'} throw.`,
        );
    }

    public announceAdditionResult(
        computerChoiceNumber: number,
        userGuessNumber: number,
        result: number,
    ) {
        console.log(
            `The result is ${computerChoiceNumber} + ${userGuessNumber} = ${result} (mod ${DICE_FACES_COUNT}).`,
        );
    }

    public writeThrowDetails(
        currentPlayer: Player,
        computerChoice: FairNumber,
        userGuess: number,
        result: number,
    ) {
        this.writeComputerNumber(computerChoice);
        this.announceAdditionResult(computerChoice.number, userGuess, result);
        this.announceThrowResult(currentPlayer, result);
    }

    public announceThrowResult(currentPlayer: Player, result: number) {
        console.log(
            `${currentPlayer.name === PlayersNames.computer ? 'My' : 'Your'} throw is ${currentPlayer.dice.faces[result]}.`,
        );
    }

    public announceWinner(firstScore: number, secondScore: number) {
        console.log(
            firstScore > secondScore
                ? `You win (${firstScore} > ${secondScore})!`
                : secondScore > firstScore
                  ? `I win (${secondScore} > ${firstScore})!`
                  : "It's a draw!",
        );
    }

    public uppercase = (stringData) => {
        return stringData.toUpperCase();
    };
}
