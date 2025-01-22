import { Config } from './Config';
import { OperationResult } from '../common/OperationResult';
import { Dice } from '../Dice';
import { DICE_FACES_COUNT } from '../common/constants';

export class ConfigParser {
    static parseArgv(argv: string[]): OperationResult<Config | undefined, string | unknown> {
        const args = argv.slice(2);

        if (args.length < 3) {
            return OperationResult.createFailed(
                `ERROR: You must provide at least 3 configurations of dices. You provided only ${args.length}.`,
            );
        }

        const dices: Dice[] = [];

        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            const faces = arg.split(',');

            if (faces.length !== DICE_FACES_COUNT) {
                return OperationResult.createFailed(
                    `ERROR: Each dice must be a list of exactly ${DICE_FACES_COUNT} sides, but you provided ${faces.length} ${faces.length > 1 ? 'sides' : 'side'} on dice ${i + 1}. Please, ${faces.length > DICE_FACES_COUNT ? `remove unnecessary (${faces.length - DICE_FACES_COUNT})` : `add the missing (${DICE_FACES_COUNT - faces.length})`} sides!`,
                );
            }

            const isInvalidCharacterExist = faces.some(
                (side) => isNaN(+side) || !Number.isInteger(+side),
            );

            if (isInvalidCharacterExist) {
                return OperationResult.createFailed(
                    `ERROR: There are invalid values in dice ${i + 1}. You must enter the valid list - each side must be an integer.`,
                );
            }

            dices.push(
                new Dice(
                    i,
                    faces.map((s) => +s),
                ),
            );
        }

        return OperationResult.createSuccessful(new Config(dices));
    }
}
