import { ConfigParser } from './config/ConfigParser';
import { Game } from './game/Game';
import { Console } from './console/Console';
import { TableGenerator } from './table/TableGenerator';

const configParser = new ConfigParser();
const parseArgvResult = configParser.parseArgv(process.argv);
if (parseArgvResult.error) {
    Console.error(parseArgvResult.error);
}

const config = parseArgvResult.result;

const table = TableGenerator.generateProbabilityTable(config.dices);
const gameConsole = new Console({ dices: config.dices, table });
const game = new Game(config, gameConsole);

game.start();
