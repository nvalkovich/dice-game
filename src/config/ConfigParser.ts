import { Config } from './Config';
import { OperationResult } from '../common/OperationResult';
import { Dice } from '../dice/Dice';
import { MIN_ARGV_LENGTH, DICE_FACES_COUNT } from '../common/constants';
import { Validator } from '../validator/Validator';
import { resources } from '../common/resources';

export class ConfigParser {
    static parseArgv(
        argv: string[],
    ): OperationResult<Config, string | unknown> {
        const lengthError = this.validateArgvLength(argv);
        if (lengthError) {
            return OperationResult.createFailed(lengthError);
        }

        const dicesResult = this.parseAllDices(argv);
        return dicesResult.error
            ? OperationResult.createFailed(dicesResult.error)
            : OperationResult.createSuccessful(new Config(dicesResult.result!));
    }

    private static validateArgvLength(argv: string[]): string | null {
        return argv.length < MIN_ARGV_LENGTH
            ? resources.errors.getInvalidArgvLengthError(argv.length)
            : null;
    }

    private static parseAllDices(
        argv: string[],
    ): OperationResult<Dice[], string | unknown> {
        const dices: Dice[] = [];

        for (let i = 0; i < argv.length; i++) {
            const { error, result } = this.parseDice(argv[i], i);
            if (error) {
                return OperationResult.createFailed(error);
            }
            dices.push(result!);
        }

        return OperationResult.createSuccessful(dices);
    }

    private static parseDice(
        arg: string,
        index: number,
    ): OperationResult<Dice, string | unknown> {
        const faces = arg.split(',');
        const error =
            Validator.validateDiceFacesCount(faces, DICE_FACES_COUNT, index) ??
            Validator.validateDiceFacesValues(faces, index);

        return error
            ? OperationResult.createFailed(error)
            : OperationResult.createSuccessful(
                  new Dice(index, faces.map(Number)),
              );
    }
}
