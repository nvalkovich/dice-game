import readlineSync from 'readline-sync';
import { Player } from '../players/Player';
import { FairNumber } from '../numberGenerator/FairNumber';
import { TableGenerator } from '../table/TableGenerator';
import { Dice } from '../dice/Dice';
import { ProbabilityCalculator } from '../probabilityCalculator/ProbabilityCalculator';
import { Validator } from '../validator/Validator';
import { resources } from '../common/resources';

export class Console {
    private gameData: {
        dices: Dice[];
    };

    constructor(gameData: { dices: Dice[] }) {
        this.gameData = gameData;
    }

    public askQuestion<T>(
        question: string,
        options: Array<T>,
        getOptionName: (option: T) => string,
    ): T {
        this.writeMenu(question, options.map(getOptionName));

        while (true) {
            const input = readlineSync
                .question(resources.menu.question)
                .trim()
                .toLowerCase();
            const dices = this.gameData.dices;

            if (['?', resources.menu.helpCommand].includes(input)) {
                this.writeHelp(dices);
                continue;
            }

            if (['x', resources.menu.exitCommand].includes(input)) {
                this.exit();
            }

            if (Validator.validateMenuInput(input, options.length)) {
                return options[parseInt(input, 10)];
            }

            console.log(resources.menu.invalidValueMessage);
        }
    }

    private generateMenu(question: string, options: string[]): string {
        const formattedOptions = options
            .map((option, index) => `${index} - ${option}`)
            .join('\n');
        return [
            question,
            formattedOptions,
            ...[
                `Х - ${resources.menu.exitCommand}`,
                `? - ${resources.menu.helpCommand}`,
            ],
        ].join('\n');
    }

    private writeMenu(question: string, options: string[]) {
        const menu = this.generateMenu(question, options);
        console.log(menu);
    }

    public writeHelp(dices: Dice[]) {
        console.log(resources.help.gameRules);
        console.log(resources.help.probabilityTableTitle);

        const probabilities =
            ProbabilityCalculator.calculateProbabilities(dices);
        const table = TableGenerator.generateProbabilityTable(
            dices,
            probabilities,
        );

        console.log(table);
    }

    public announceFirstMove() {
        console.log(resources.firstMove.determineFirstMove);
    }

    public writeComputerSelection(fairNumber: FairNumber) {
        console.log(
            resources.firstMove.getComputerSelectionMessage(fairNumber),
        );
    }

    public writeComputerNumber(fairNumber: FairNumber) {
        console.log(resources.throw.getComputerNumberMessage(fairNumber));
    }

    public announceThrow(currentPlayerName: string) {
        console.log(
            resources.throw.getThrowAnnouncementMessage(currentPlayerName),
        );
    }

    public writeThrowDetails(
        currentPlayer: Player,
        computerChoice: FairNumber,
        userGuess: number,
        result: number,
    ) {
        this.writeComputerNumber(computerChoice);
        this.writeAdditionResult(computerChoice.number, userGuess, result);
        this.writeThrowResult(currentPlayer, result);
    }

    public writeAdditionResult(
        computerChoiceNumber: number,
        userGuessNumber: number,
        result: number,
    ) {
        console.log(
            resources.throw.getAdditionResultMessage(
                computerChoiceNumber,
                userGuessNumber,
                result,
            ),
        );
    }

    public writeThrowResult(currentPlayer: Player, result: number) {
        console.log(
            resources.throw.getThrowResultMessage(currentPlayer, result),
        );
    }

    public writeWinner(firstScore: number, secondScore: number) {
        console.log(resources.final.getWinnerMessage(firstScore, secondScore));
    }

    public exit() {
        console.log(resources.exit.exitMessage);
        process.exit(0);
    }

    public static error(message: string | unknown) {
        console.log(message);
        process.exit(0);
    }
}
