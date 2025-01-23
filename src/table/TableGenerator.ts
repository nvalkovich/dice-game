import { Dice } from '../dice/Dice';
import CliTable from 'cli-table3';
import { resources } from '../common/resources';

export class TableGenerator {
    public static generateProbabilityTable(
        dices: Dice[],
        probabilities: number[][],
    ): string {
        const header = [
            resources.help.probabilityTableHeader,
            ...dices.map((dice) => JSON.stringify(dice.faces)),
        ];
        const table = new CliTable({
            head: header,
            colWidths: [30, ...Array(dices.length).fill(20)],
        });

        dices.forEach((dice, i) => {
            const row = [JSON.stringify(dice.faces)];
            probabilities[i].forEach((probability, j) => {
                row.push(
                    i === j
                        ? `- (${probability.toFixed(4)})`
                        : probability.toFixed(4),
                );
            });
            table.push(row);
        });

        return table.toString();
    }
}
