import { DICE_FACES_COUNT } from '../common/constants';
import { resources } from '../common/resources';

export class DiceFacesValidator {
    private static readonly EXPECTED_FACES_COUNT = DICE_FACES_COUNT;
    private static readonly FACE_VALUE_REGEXP = /^-?\d+$/;

    private readonly diceNumber: number;
    private faces: string[];

    constructor(diceNumber: number, faces: string[]) {
        this.diceNumber = diceNumber;
        this.faces = faces;
    }

    public validate(): string | undefined {
        return this.validateFacesCount() ?? this.validateFacesValues();
    }

    private validateFacesCount(): string | undefined {
        const facesCount = this.faces.length;
        const facesDiff = facesCount - DiceFacesValidator.EXPECTED_FACES_COUNT;
        if (facesDiff !== 0) {
            const actionHint =
                facesDiff > 0
                    ? resources.errors.getRemoveExtraFaces(facesDiff)
                    : resources.errors.getAddMissingFaces(-facesDiff);

            const error = resources.errors.getInvalidDiceFacesCount(
                this.diceNumber,
                DiceFacesValidator.EXPECTED_FACES_COUNT,
                facesCount,
            );

            return `${error} ${actionHint}`;
        }
    }

    private validateFacesValues(): string | undefined {
        const invalidFaces = this.faces.filter(
            (f) => !DiceFacesValidator.FACE_VALUE_REGEXP.test(f),
        );

        if (invalidFaces.length) {
            return resources.errors.getInvalidDiceFaces(
                this.diceNumber,
                invalidFaces,
            );
        }
    }
}
