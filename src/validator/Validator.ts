import { resources } from '../common/resources';

export class Validator {
    public static validateDiceFacesCount(
        faces: string[],
        expectedCount: number,
        diceIndex: number,
    ): string | null {
        if (faces.length !== expectedCount) {
            return resources.errors.getInvalidDiceFacesCountError(
                faces,
                expectedCount,
                diceIndex,
            );
        }
        return null;
    }

    public static validateDiceFacesValues(
        faces: string[],
        diceIndex: number,
    ): string | null {
        const invalidFaces = faces.filter(
            (face) => !/^-?\d+$/.test(face) || !Number.isInteger(+face),
        );

        if (invalidFaces.length > 0) {
            return resources.errors.getInvalidDiceFacesValuesError(
                diceIndex,
                invalidFaces,
            );
        }

        return null;
    }

    public static validateMenuInput(
        input: string,
        optionsLength: number,
    ): boolean {
        const index = parseInt(input, 10);
        return !isNaN(index) && index >= 0 && index < optionsLength;
    }
}
