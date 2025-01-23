import { Console } from '../console/Console';
import { Config } from '../config/Config';
import { Dice } from '../dice/Dice';
import { Player } from '../players/Player';
import { HumanPlayer } from '../players/HumanPlayer';
import { ComputerPlayer } from '../players/ComputerPlayer';
import {
    DICE_FACES_COUNT,
    FIRST_MOVE_OPTIONS,
    FIRST_MOVE_OPTIONS_COUNT,
} from '../common/constants';
import { resources } from '../common/resources';

export class Game {
    private readonly dices: Dice[];
    private readonly gameConsole: Console;
    private readonly human: HumanPlayer;
    private readonly computer: ComputerPlayer;
    private firstPlayer!: Player;
    private secondPlayer!: Player;

    constructor(config: Config) {
        this.dices = config.dices;
        this.human = new HumanPlayer(this.promptUserChoice.bind(this));
        this.computer = new ComputerPlayer();
        this.gameConsole = new Console({ dices: this.dices });
    }

    public start() {
        this.determineFirstMove();
        this.selectDice();
        this.playGame();
    }

    private determineFirstMove() {
        this.gameConsole.announceFirstMove();

        const computerChoice = this.generateComputerChoice(FIRST_MOVE_OPTIONS_COUNT);
        const userGuess = this.promptUserChoice(
            FIRST_MOVE_OPTIONS,
            resources.menu.firstMoveMessage,
        );

        this.gameConsole.writeComputerSelection(computerChoice);

        this.determineFirstPlayer(userGuess, computerChoice);
    }

    private determineFirstPlayer(userGuess, computerChoice) {
        [this.firstPlayer, this.secondPlayer] =
            userGuess === computerChoice.number
                ? [this.human, this.computer]
                : [this.computer, this.human];
    }

    private selectDice() {
        const firstPlayerName = this.firstPlayer.name;
        this.firstPlayer.selectDice(this.dices, firstPlayerName);
        this.secondPlayer.selectDice(this.getAvailableDice(this.firstPlayer.dice), firstPlayerName);
    }

    private playGame() {
        const firstScore = this.takeThrowOrder(this.firstPlayer);
        const secondScore = this.takeThrowOrder(this.secondPlayer);

        this.gameConsole.writeWinner(firstScore, secondScore);
    }

    private takeThrowOrder(player: Player): number {
        this.gameConsole.announceThrow(player.name);

        const { computerChoice, userGuess } = this.throw();

        const result = this.calculateThrowResult(computerChoice.number, userGuess);
        this.gameConsole.writeThrowDetails(player, computerChoice, userGuess, result);

        return player.dice.faces[result];
    }

    private throw() {
        const computerChoice = this.generateComputerChoice(DICE_FACES_COUNT);
        const userGuess = this.promptUserChoice(
            Array.from({ length: 6 }, (_, i) => i),
            resources.menu.addNumberMessage,
        );

        return { computerChoice, userGuess };
    }

    private calculateThrowResult(computerNumber: number, userNumber: number) {
        return (computerNumber + userNumber) % 6;
    }

    private getAvailableDice(selectedDice: Dice): Dice[] {
        return this.dices.filter((dice) => dice !== selectedDice);
    }

    private generateComputerChoice(maxValue: number) {
        return this.computer.generateRandomChoice(maxValue);
    }

    private promptUserChoice<T>(options: T[], message: string): T {
        return this.gameConsole.askQuestion(message, options, (o) => o.toString());
    }
}
