import { Config } from './Config';
import { ConfigParsingResult } from './ConfigParsingResult';
import { Dice } from '../dice/Dice';
import { MIN_DICES_COUNT } from '../common/constants';
import { resources } from '../common/resources';
import { DiceFacesValidator } from '../dice/DiceFacesValidator';

export class ConfigParser {
    private static MIN_DICES_COUNT = MIN_DICES_COUNT;

    public parseArgv(argv: string[]): ConfigParsingResult<Config, string> {
        const { result: dices, error } = this.parseDices(argv.slice(2));
        if (error) {
            return ConfigParsingResult.createFailed(error);
        }

        const lengthError = this.validateDicesCount(dices);
        if (lengthError) {
            return ConfigParsingResult.createFailed(lengthError);
        }

        return ConfigParsingResult.createSuccessful(new Config(dices));
    }

    private parseDices(argv: string[]): ConfigParsingResult<Dice[], string> {
        const dices: Dice[] = [];
        for (let i = 0; i < argv.length; i++) {
            const { result: dice, error } = this.parseDice(i, argv[i]);
            if (error) {
                return ConfigParsingResult.createFailed<Dice[], string>(error);
            }
            dices.push(dice);
        }

        return ConfigParsingResult.createSuccessful(dices);
    }

    private parseDice(
        index: number,
        arg: string,
    ): ConfigParsingResult<Dice, string> {
        const faces = arg.split(',');

        const diceFacesValidator = new DiceFacesValidator(index + 1, faces);
        const error = diceFacesValidator.validate();

        return error
            ? ConfigParsingResult.createFailed<Dice, string>(error)
            : ConfigParsingResult.createSuccessful<Dice, string>(
                  new Dice(index, faces.map(Number)),
              );
    }

    private validateDicesCount(argv: Dice[]): string | undefined {
        return argv.length < ConfigParser.MIN_DICES_COUNT
            ? resources.errors.getInvalidArgvLength(
                  ConfigParser.MIN_DICES_COUNT,
                  argv.length,
              )
            : undefined;
    }
}
