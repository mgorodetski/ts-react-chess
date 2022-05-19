import { Cell } from "./Cell";
import { Colors } from "./Colors";

const BOARDSIZE = 8;

export class Board {
  cells: Cell[][] = [];


  //TODO: following function contains circle dependency which is better to be avoided
  public initCells() {
    for (let i = 0; i < BOARDSIZE; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < BOARDSIZE; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); // black cells
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); // white cells
        }

      }
      this.cells.push(row);
    }
  }
}