import { Console } from '../console/Console';
import { Config } from '../config/Config';
import { Dice } from '../dice/Dice';
import { Player } from '../players/Player';
import { HumanPlayer } from '../players/HumanPlayer';
import { ComputerPlayer } from '../players/ComputerPlayer';
import { DICE_FACES_COUNT } from '../common/constants';
import { resources } from '../common/resources';
import { FairNumber } from '../numberGenerator/FairNumber';

export class Game {
    private readonly dices: Dice[];
    private readonly gameConsole: Console;
    private readonly human: HumanPlayer;
    private readonly computer: ComputerPlayer;
    private firstPlayer!: Player;
    private secondPlayer!: Player;

    constructor(config: Config, gameConsole: Console) {
        this.dices = config.dices;
        this.human = new HumanPlayer(this.promptUserChoice.bind(this));
        this.computer = new ComputerPlayer();
        this.gameConsole = gameConsole;
    }

    public start() {
        this.determineFirstMove();
        this.selectDice();
        this.playGame();
    }

    private determineFirstMove() {
        this.gameConsole.announceFirstMove();

        const computerChoice = this.generateComputerChoice(
            Console.FIRST_MOVE_MENU_OPTIONS.length,
        );
        const userGuess = this.promptUserChoice(
            Console.FIRST_MOVE_MENU_OPTIONS,
            resources.messages.tryToGuessSelection,
        );

        this.gameConsole.writeFairNumberMessage(
            resources.messages.mySelection,
            computerChoice,
        );

        this.determineFirstPlayer(userGuess, computerChoice);
    }

    private determineFirstPlayer(
        userGuess: number,
        computerChoice: FairNumber,
    ) {
        [this.firstPlayer, this.secondPlayer] =
            userGuess === computerChoice.number
                ? [this.human, this.computer]
                : [this.computer, this.human];
    }

    private selectDice() {
        const firstPlayerName = this.firstPlayer.name;
        this.firstPlayer.selectDice(this.dices, firstPlayerName);
        this.secondPlayer.selectDice(
            this.getAvailableDice(this.firstPlayer.dice),
            firstPlayerName,
        );
    }

    private playGame() {
        this.takeThrowOrder(this.firstPlayer);
        this.takeThrowOrder(this.secondPlayer);

        this.gameConsole.writeWinner(
            this.human.throwResult,
            this.computer.throwResult,
        );
    }

    private takeThrowOrder(player: Player) {
        this.gameConsole.announceThrow(player.name);

        const { computerChoice, userGuess } = this.throw();

        const result = this.calculateThrowResult(
            computerChoice.number,
            userGuess,
        );

        player.setResult(result);

        this.gameConsole.writeThrowDetails(
            player,
            computerChoice,
            userGuess,
            result,
        );
    }

    private throw() {
        const computerChoice = this.generateComputerChoice(DICE_FACES_COUNT);
        const userGuess = this.promptUserChoice(
            Array.from({ length: DICE_FACES_COUNT }, (_, i) => i),
            resources.messages.getAddNumberModulo(DICE_FACES_COUNT),
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
        return this.gameConsole.askQuestion(message, options, (o) =>
            o.toString(),
        );
    }
}
