export const resources = {
    messages: {
        getISelectedRandomValue: (
            rangeStart: number,
            rangeEnd: number,
            hmac: string,
        ) =>
            `I selected a random value in the range ${rangeStart}..${rangeEnd} (HMAC=${hmac.toUpperCase()})`,
        tryToGuessSelection: 'Try to guess my selection.',
        chooseYourDice: 'Choose your dice:',
        getAddNumberModulo: (modulo: number) =>
            `Add your number modulo ${modulo}.`,
        yourSelection: 'Your selection: ',
        help: 'help',
        exit: 'exit',
        invalidValuePleaseSelectFromList:
            'Invalid value. Please, select a value from the list above.',
        letsDetermineFirstMove: `Let's determine who makes the first move.`,
        youMakeFirstMove: 'You make the first move.',
        mySelection: `My selection:`,
        myNumber: `My number is`,
        i: 'I',
        makeTheFirstMove: 'make the first move and',
        getChooseDice: (dice: string) => `choose ${dice} dice`,
        getYouChooseDice: (dice: string) => `You chose ${dice} dice.`,
        getNumberAndKey: (number: number, key: string) =>
            `${number} (KEY=${key.toUpperCase()}`,
        my: 'My',
        your: 'Your',
        getItsTimeForThrow: (player: string) =>
            `It's time for ${player.toLowerCase()} throw.`,
        getTheResultIs: (
            first: number,
            second: number,
            sum: number,
            mod: number,
        ) => `The result is ${first} + ${second} = ${sum} (mod ${mod}).`,
        getPlayerThrowIs: (player: string, result: number) =>
            `${player} throw is ${result}.`,
        youWin: 'You win',
        iWin: 'I win',
        itsDraw: "It's a draw",
        getFirstHigherThanSecond: (first: number, second: number) =>
            `(${first} > ${second})!`,
        getFirstEqualWithSecond: (first: number, second: number) =>
            `(${first} = ${second})!`,
        gameRules: `Game Rules:
1. Determine first move:
    The player chooses 0 or 1. If they guess correctly, they go first; otherwise, the computer does.
2. Dice selection:
    The player and the computer choose different dice from the available options.
2. Throw dices:
   - The computer generates a random number, calculates the HMAC using the secret key and displays it to verify the fairness of the number.
   - The player chooses a number within the same range.
   - The final throw value for each player is the die face index, calculated as the sum of the user number and the computer number using modular arithmetic.
3. Final:
    Each player makes one throw.
    The player with the higher final value wins or it can be a draw.`,
        probabilityTableTitle:
            'The table below shows the probability of winning for each pair of dice.',
        userDice: 'User dice ',
        exitGame: 'Exiting the game. Bye!',
    },
    errors: {
        error: 'ERROR:',
        getInvalidArgvLength: (minLength: number, length: number) =>
            `${resources.errors.error} You must provide at least ${minLength} configurations of dices. You provided ${length}.`,
        getInvalidDiceFacesCount: (
            diceNumber: number,
            expectedCount: number,
            count: number,
        ) =>
            `${resources.errors.error} Each dice must have exactly ${expectedCount} faces, but dice ${diceNumber} has ${count}.`,
        getRemoveExtraFaces: (count: number) =>
            `Remove ${count} extra ${count > 1 ? 'faces' : 'face'}.`,
        getAddMissingFaces: (count: number) =>
            `Add ${count} missing ${count > 1 ? 'faces' : 'face'}.`,
        getInvalidDiceFaces: (diceNumber: number, invalidFaces: string[]) =>
            `${resources.errors.error} Dice ${diceNumber} contains invalid ${invalidFaces.length > 1 ? 'values' : 'value'}: ${invalidFaces.join(', ')}. Each face must be an integer.`,
    },
};
