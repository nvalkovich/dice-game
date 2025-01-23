import { Dice } from '../dice/Dice';
import CliTable, { Table } from 'cli-table3';
import { resources } from '../common/resources';
import { ProbabilityCalculator } from '../probabilityCalculator/ProbabilityCalculator';

export class TableGenerator {
    private static readonly USER_DICE_COLUMN_WIDTH = 30;
    private static readonly DICE_COLUMN_WIDTH = 20;
    private static readonly PROBABILITY_PRECISION = 4;
    private static readonly DIAGONAL_PROBABILITY_FORMAT = `- ({0})`;

    public static generateProbabilityTable(dices: Dice[]): string {
        const probabilities =
            ProbabilityCalculator.calculateProbabilities(dices);

        const tableHeaders = this.createTableHeaders(dices);
        const table = this.initializeTable(tableHeaders, dices.length);

        this.fillTableWithProbabilities(table, dices, probabilities);

        return table.toString();
    }

    private static createTableHeaders(dices: Dice[]): string[] {
        return [
            resources.messages.userDice,
            ...dices.map((dice) => dice.toString()),
        ];
    }

    private static initializeTable(
        headers: string[],
        diceCount: number,
    ): Table {
        return new CliTable({
            head: headers,
            colWidths: [
                this.USER_DICE_COLUMN_WIDTH,
                ...Array(diceCount).fill(this.DICE_COLUMN_WIDTH),
            ],
        }) as Table;
    }

    private static fillTableWithProbabilities(
        table: Table,
        dices: Dice[],
        probabilities: number[][],
    ): void {
        dices.forEach((dice, rowIndex) => {
            const row = this.createTableRow(
                dice,
                probabilities[rowIndex],
                rowIndex,
            );
            table.push(row);
        });
    }

    private static createTableRow(
        dice: Dice,
        probabilities: number[],
        rowIndex: number,
    ): string[] {
        return [
            dice.toString(),
            ...this.formatProbabilities(probabilities, rowIndex),
        ];
    }

    private static formatProbabilities(
        probabilities: number[],
        rowIndex: number,
    ): string[] {
        return probabilities.map((probability, colIndex) => {
            const formattedProbability = probability.toFixed(
                this.PROBABILITY_PRECISION,
            );
            return rowIndex === colIndex
                ? this.DIAGONAL_PROBABILITY_FORMAT.replace(
                      '{0}',
                      formattedProbability,
                  )
                : formattedProbability;
        });
    }
}
