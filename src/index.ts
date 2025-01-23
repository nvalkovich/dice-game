import { ConfigParser } from './config/ConfigParser';
import { Game } from './game/Game';
import { Console } from './console/Console';

const parseArgvResult = ConfigParser.parseArgv(process.argv.slice(2));
if (parseArgvResult.error) {
    Console.error(parseArgvResult.error);
}

const config = parseArgvResult.result;

const game = new Game(config);
game.start();
