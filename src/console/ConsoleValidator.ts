export class ConsoleValidator {
    public static validateMenuInput(
        input: string,
        optionsLength: number,
    ): boolean {
        const index = parseInt(input, 10);
        return !isNaN(index) && index >= 0 && index < optionsLength;
    }
}
