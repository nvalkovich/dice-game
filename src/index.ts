import { ConfigParser } from './config/ConfigParser';

const parseArgvResult = ConfigParser.parseArgv(process.argv);
if (parseArgvResult.error) {
    console.log(parseArgvResult.error);
}

const config = parseArgvResult.result;
console.log(config);
