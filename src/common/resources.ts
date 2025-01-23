import { DICE_FACES_COUNT, MIN_ARGV_LENGTH } from './constants';
import { FairNumber } from '../numberGenerator/FairNumber';
import { Player, PlayersNames } from '../players/Player';

export const resources = {
    common: {
        getComputerSelectedValueMessage: (
            startValue: number,
            maxValue: number,
            hmac: string,
        ): string =>
            `I selected a random value in the range ${startValue}..${maxValue} (HMAC=${hmac.toUpperCase()})`,
    },
    menu: {
        firstMoveMessage: 'Try to guess my selection. ',
        chooseDiceMessage: 'Choose your dice: ',
        addNumberMessage: `Add your number modulo ${DICE_FACES_COUNT}.`,
        question: 'Your selection: ',
        helpCommand: 'help',
        exitCommand: 'exit',
        invalidValueMessage:
            'Invalid value. Please, select a value from the list above.',
    },
    firstMove: {
        determineFirstMove: `Let's determine who makes the first move.`,
        userMakesFirstMove: 'You make the first move.',
        getComputerSelectionMessage: ({ number, key }: FairNumber): string =>
            `My selection: ${number} (KEY=${key.toUpperCase()}).`,
    },
    dice: {
        getComputerChooseDiceMessage: (
            isComputerFirst: boolean,
            dice: string,
        ): string =>
            `${isComputerFirst ? 'I make the first move and' : 'I'} choose ${dice} dice.`,
        getUserChooseDiceMessage: (dice: string): string =>
            `You chose ${dice} dice.`,
    },
    throw: {
        getComputerNumberMessage: ({ number, key }: FairNumber): string =>
            `My number is ${number} (KEY=${key.toUpperCase()}).`,
        getThrowAnnouncementMessage: (currentPlayerName: string): string =>
            `It's time for ${currentPlayerName === PlayersNames.computer ? 'my' : 'your'} throw.`,
        getAdditionResultMessage: (
            computerChoiceNumber: number,
            userGuessNumber: number,
            result: number,
        ): string =>
            `The result is ${computerChoiceNumber} + ${userGuessNumber} = ${result} (mod ${DICE_FACES_COUNT}).`,
        getThrowResultMessage: (
            { name, dice }: Player,
            result: number,
        ): string =>
            `${name === PlayersNames.computer ? 'My' : 'Your'} throw is ${dice.faces[result]}.`,
    },
    final: {
        getWinnerMessage: (firstScore: number, secondScore: number): string =>
            firstScore > secondScore
                ? `You win (${firstScore} > ${secondScore})!`
                : secondScore > firstScore
                  ? `I win (${secondScore} > ${firstScore})!`
                  : "It's a draw!",
    },
    help: {
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
        probabilityTableHeader: 'User dice ',
    },
    exit: {
        exitMessage: 'Exiting the game. Bye!',
    },
    errors: {
        getInvalidArgvLengthError: (length: number): string =>
            `Error: You must provide at least ${MIN_ARGV_LENGTH} configurations of dices. You provided only ${length}.`,
        getInvalidDiceFacesCountError: (
            faces: string[],
            expectedCount: number,
            diceIndex: number,
        ): string =>
            `ERROR: Each dice must have exactly ${expectedCount} faces, but dice ${
                diceIndex + 1
            } has ${faces.length}. ${
                faces.length > expectedCount
                    ? `Remove ${faces.length - expectedCount} extra ${faces.length - expectedCount > 1 ? 'faces' : 'face'}.`
                    : `Add ${expectedCount - faces.length} missing ${expectedCount - faces.length > 1 ? 'faces' : 'face'}.`
            }`,
        getInvalidDiceFacesValuesError: (
            diceIndex: number,
            invalidFaces: string[],
        ): string =>
            `ERROR: Dice ${diceIndex + 1} contains invalid ${invalidFaces.length > 1 ? 'values' : 'value'}: ${invalidFaces.join(', ')}. Each face must be an integer.`,
    },
};
