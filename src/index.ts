import { ConfigParser } from './config/ConfigParser';
import { Game } from './game/Game';

const parseArgvResult = ConfigParser.parseArgv(process.argv);
if (parseArgvResult.error) {
    console.log(parseArgvResult.error);
}

const config = parseArgvResult.result;

const game = new Game(config);

game.start();
