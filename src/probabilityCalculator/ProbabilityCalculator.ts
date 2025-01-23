import { Dice } from '../dice/Dice';

export class ProbabilityCalculator {
    public static calculateProbabilities(dices: Dice[]): number[][] {
        return dices.map((diceA) =>
            dices.map((diceB) => this.calculateWinProbability(diceA, diceB)),
        );
    }

    private static calculateWinProbability(diceA: Dice, diceB: Dice): number {
        const facesA = diceA.faces;
        const facesB = diceB.faces;

        const wins = facesA.reduce(
            (wins, faceA) =>
                wins + facesB.filter((faceB) => faceA > faceB).length,
            0,
        );
        return wins / (facesA.length * facesB.length);
    }

    public static findBestDice(dices: Dice[]): Dice | null {
        const probabilities = this.calculateProbabilities(dices);

        let bestIndex = -1;
        let bestAverage = -1;

        for (let i = 0; i < probabilities.length; i++) {
            const average = this.findProbabilitiesRowAverage(
                probabilities[i],
                i,
            );

            if (average > bestAverage) {
                bestIndex = i;
                bestAverage = average;
            }
        }

        return dices[bestIndex];
    }

    private static findProbabilitiesRowAverage(
        probabilitiesRow: number[],
        excludeIndex: number,
    ) {
        const sum = probabilitiesRow
            .filter((_, index) => index !== excludeIndex)
            .reduce((p, sum) => p + sum);

        return sum / probabilitiesRow.length - 1;
    }
}
