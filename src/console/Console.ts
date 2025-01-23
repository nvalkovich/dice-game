import readlineSync from 'readline-sync';
import { Player, PlayersNames } from '../players/Player';
import { FairNumber } from '../numberGenerator/FairNumber';
import { Dice } from '../dice/Dice';
import { ConsoleValidator } from './ConsoleValidator';
import { resources } from '../common/resources';
import { DICE_FACES_COUNT } from '../common/constants';

export class Console {
    private static readonly HELP_COMMANDS = ['?', resources.messages.help];
    private static readonly EXIT_COMMANDS = ['x', resources.messages.exit];
    public static readonly FIRST_MOVE_MENU_OPTIONS = [0, 1];

    private gameData: {
        dices: Dice[];
        table: string;
    };

    constructor(gameData: { dices: Dice[]; table: string }) {
        this.gameData = gameData;
    }

    public askQuestion<T>(
        question: string,
        options: Array<T>,
        getOptionName: (option: T) => string,
    ): T {
        this.writeMenu(question, options.map(getOptionName));

        while (true) {
            const input = this.getUserInput();

            if (Console.HELP_COMMANDS.includes(input)) {
                this.writeHelp();
                continue;
            } else if (Console.EXIT_COMMANDS.includes(input)) {
                this.exit();
            }

            if (ConsoleValidator.validateMenuInput(input, options.length)) {
                return options[parseInt(input)];
            }

            this.showInvalidInputMessage();
        }
    }

    private getUserInput(): string {
        return readlineSync
            .question(resources.messages.yourSelection)
            .trim()
            .toLowerCase();
    }

    private showInvalidInputMessage() {
        console.log(resources.messages.invalidValuePleaseSelectFromList);
    }

    private writeMenu(question: string, options: string[]) {
        const menu = this.generateMenu(question, options);
        console.log(menu);
    }

    private generateMenu(question: string, options: string[]): string {
        const formattedOptions = options
            .map((option, index) => `${index} - ${option}`)
            .join('\n');
        return [
            question,
            formattedOptions,
            ...[
                `Х - ${resources.messages.exit}`,
                `? - ${resources.messages.help}`,
            ],
        ].join('\n');
    }

    public writeHelp() {
        console.log(resources.messages.gameRules);
        console.log(resources.messages.probabilityTableTitle);

        console.log(this.gameData.table);
    }

    public announceFirstMove() {
        console.log(resources.messages.letsDetermineFirstMove);
    }

    public writeFairNumberMessage(text: string, fairNumber: FairNumber) {
        const message = this.formatFairNumberMessage(text, fairNumber);
        console.log(message);
    }

    private formatFairNumberMessage(
        message: string,
        fairNumber: FairNumber,
    ): string {
        return [
            message,
            resources.messages.getNumberAndKey(
                fairNumber.number,
                fairNumber.key,
            ),
        ].join(' ');
    }

    public announceThrow(currentPlayerName: string) {
        const player =
            currentPlayerName === PlayersNames.computer
                ? resources.messages.my
                : resources.messages.your;

        console.log(resources.messages.getItsTimeForThrow(player));
    }

    public writeThrowDetails(
        currentPlayer: Player,
        computerChoice: FairNumber,
        userGuess: number,
        result: number,
    ) {
        this.writeFairNumberMessage(
            resources.messages.myNumber,
            computerChoice,
        );
        this.writeAdditionResult(computerChoice.number, userGuess, result);
        this.writeThrowResult(currentPlayer);
    }

    public writeAdditionResult(
        computerChoiceNumber: number,
        userGuessNumber: number,
        result: number,
    ) {
        console.log(
            resources.messages.getTheResultIs(
                computerChoiceNumber,
                userGuessNumber,
                result,
                DICE_FACES_COUNT,
            ),
        );
    }

    public writeThrowResult(currentPlayer: Player) {
        const face = currentPlayer.throwResult;
        const player =
            currentPlayer.name === PlayersNames.computer
                ? resources.messages.my
                : resources.messages.your;
        console.log(resources.messages.getPlayerThrowIs(player, face));
    }

    public writeWinner(humanScore: number, computerScore: number) {
        if (humanScore === computerScore) {
            this.showDrawMessage(humanScore, computerScore);
            return;
        }

        const [winnerMessage, higherScore, lowerScore] =
            this.getWinnerMessageAndScores(humanScore, computerScore);
        this.showWinnerMessage(winnerMessage, higherScore, lowerScore);
    }

    private showDrawMessage(humanScore: number, computerScore: number) {
        console.log(
            `${resources.messages.itsDraw} ${resources.messages.getFirstEqualWithSecond(humanScore, computerScore)}`,
        );
    }

    private getWinnerMessageAndScores(
        humanScore: number,
        computerScore: number,
    ): [string, number, number] {
        return humanScore > computerScore
            ? [resources.messages.youWin, humanScore, computerScore]
            : [resources.messages.iWin, computerScore, humanScore];
    }

    private showWinnerMessage(
        winnerMessage: string,
        higherScore: number,
        lowerScore: number,
    ) {
        console.log(
            `${winnerMessage} ${resources.messages.getFirstHigherThanSecond(higherScore, lowerScore)}`,
        );
    }

    public exit() {
        console.log(resources.messages.exitGame);
        process.exit(0);
    }

    public static error(message: string) {
        console.log(message);
        process.exit(0);
    }
}
