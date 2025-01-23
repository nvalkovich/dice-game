import { Dice } from '../dice/Dice';
import { MIN_ARGV_LENGTH } from '../common/constants';

interface BestDiceResult {
    index: number;
    average: number;
}

export class ProbabilityCalculator {
    public static calculateProbabilities(dices: Dice[]) {
        return dices.map((diceA, i) =>
            dices.map((diceB, j) =>
                i === j
                    ? this.getSelfProbability()
                    : this.getWinProbability(diceA.faces, diceB.faces),
            ),
        );
    }

    private static getSelfProbability(): number {
        return 1 / MIN_ARGV_LENGTH;
    }

    private static getWinProbability(diceA: number[], diceB: number[]): number {
        const wins = this.countWins(diceA, diceB);
        const totalOutcomes = diceA.length * diceB.length;
        return this.calculateProbability(wins, totalOutcomes);
    }

    private static countWins(diceA: number[], diceB: number[]): number {
        return diceA.reduce((wins, faceA) => wins + this.countFaceWins(faceA, diceB), 0);
    }

    private static countFaceWins(faceA: number, diceB: number[]): number {
        return diceB.filter((faceB) => faceA > faceB).length;
    }

    private static calculateProbability(wins: number, totalOutcomes: number): number {
        return wins / totalOutcomes;
    }

    public static findBestDice(dices: Dice[]) {
        const probabilities = this.calculateProbabilities(dices);
        const bestDiceIndex = this.getBestDiceIndex(probabilities);

        return bestDiceIndex !== null ? dices[bestDiceIndex] : null;
    }

    private static getBestDiceIndex(probabilities: number[][]) {
        let bestDice = null;

        for (let i = 0; i < probabilities.length; i++) {
            const averageWinProbability = this.calculateAverageWinProbability(probabilities, i);
            bestDice = this.getUpdatedBestDice(bestDice, i, averageWinProbability);
        }

        return bestDice ? bestDice.index : null;
    }

    private static getUpdatedBestDice(
        currentBest: BestDiceResult | null,
        index: number,
        averageWinProbability: number,
    ) {
        return !currentBest || averageWinProbability > currentBest.average
            ? { index, average: averageWinProbability }
            : currentBest;
    }

    private static calculateAverageWinProbability(
        probabilities: Array<number[]>,
        index: number,
    ): number {
        const filteredProbabilities = probabilities[index].filter((_, j) => j !== index);
        const sum = filteredProbabilities.reduce((acc, prob) => acc + prob, 0);

        return sum / filteredProbabilities.length;
    }
}
