import { useState } from "react";
import { isNumber } from "lodash";
import BoardStyles from "./Board.module.css";
import { BoardWithOptions, CellType, RowType } from "../types";

interface BoardProps {
  board: BoardWithOptions;
  setBoard: (board: BoardWithOptions) => void;
}

const getCellClass = (
  rowIndex: number,
  columnIndex: number,
  cellType: CellType,
) => {
  return `${BoardStyles.cell} ${
    [2, 5, 8].includes(rowIndex) ? BoardStyles.boxBottom : ""
  } ${[2, 5, 8].includes(columnIndex) ? BoardStyles.boxRight : ""} ${
    columnIndex === 0 ? BoardStyles.boardStartLeft : ""
  } ${rowIndex === 0 ? BoardStyles.boardStartTop : ""}
  ${cellType === "user" ? BoardStyles.userCell : ""} ${
    cellType === "solution" ? BoardStyles.solutionCell : ""
  }`;
};
export const Board = ({ board, setBoard }: BoardProps) => {
  const [currentOptions, setCurrentOptions] = useState<boolean[]>([]);
  const handleChange = (
    rowIndex: number,
    columnIndex: number,
    value: string,
  ) => {
    const numberValue = Number(value);
    if (
      value === "" ||
      (isNumber(numberValue) && numberValue >= 1 && numberValue <= 9)
    ) {
      const newBoard = [...board];
      newBoard[rowIndex][columnIndex] = {
        value: numberValue,
        type: "user",
        rowIndex: rowIndex,
        colIndex: columnIndex,
        options: [],
      };
      setBoard(newBoard);
    }
  };

  return (
    <div>
      <div className={BoardStyles.board}>
        {board.map((row: RowType, rowIndex: number) =>
          row.map((cell, columnIndex: number) => (
            <input
              key={`${rowIndex}-${columnIndex}`}
              type="text"
              className={getCellClass(rowIndex, columnIndex, cell.type)}
              value={board[rowIndex][columnIndex].value || ""}
              onChange={(e) =>
                handleChange(rowIndex, columnIndex, e.target.value)
              }
              maxLength={1}
              onMouseEnter={() => {
                setCurrentOptions(board[rowIndex][columnIndex].options);
              }}
              onMouseLeave={() => {
                setCurrentOptions([]);
              }}
            />
          )),
        )}
      </div>
      <div className={BoardStyles.optionsContainer}>
        {currentOptions.map((value, index) =>
          value && index > 0 ? (
            <span className={BoardStyles.option} key={index}>
              {index}
            </span>
          ) : null,
        )}
      </div>
    </div>
  );
};
