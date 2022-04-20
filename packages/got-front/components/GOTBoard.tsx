import { useState } from 'react';
import { Button } from './Button';
import { Board } from '@l22-got-monorepo/got-core';
import { Cell } from './Cell';
import { produce } from 'immer';
import { Input } from './Input';
import { SendRequest } from '../services/sendRequest';

export interface GOTBoardProps {}

export function GOTBoard() {
  const [board, setBoard] = useState<(0 | 1)[][]>([]);
  const [boardId, setBoardId] = useState<number>(0);

  function handleTick() {
    setBoard(new Board(board).tick());
    // new SendRequest().tick(boardId).then((res: (0 | 1)[][]) => {
    //   setBoard(res);
    // });
  }

  function handleStartClick() {
    const newBoardId = Math.random();
    setBoardId(newBoardId);
    const emptyBoard = new Array(board.length).fill(new Array(board.length).fill(0));
    setBoard(emptyBoard)
    console.log(newBoardId);
    // new SendRequest()
    //   .newBoard(boardId, emptyBoard)
    //   .then((res: number) => console.log('id: ', res));
  }

  function handleCellClick(rowIdx: number, cellIdx: number) {
    setBoard(
      produce((draft) => {
        if (draft[rowIdx][cellIdx] === 0) {
          draft[rowIdx][cellIdx] = 1;
        } else {
          draft[rowIdx][cellIdx] = 0;
        }
      })
    );
  }

  function handleInputChange(inputValue: number) {
    setBoard(new Array(inputValue).fill(new Array(inputValue).fill(0)));
    setBoardId(0);
  }


  return (
    <div className="game-area">
      <Input
        onInputChange={(inputValue) => {
          handleInputChange(inputValue);
        }}
        onStartClick={() => {
          handleStartClick();
        }}
      />
      <div className="board">
        {board.map((row, rowIdx) => {
          return (
            <div className="row" key={rowIdx}>
              {row.map((cell, cellIdx) => {
                return (
                  <Cell
                    state={cell}
                    onCellClick={() => handleCellClick(rowIdx, cellIdx)} key={cellIdx}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <Button
        onClick={() => {
          handleTick();
        }}
        hide={!boardId ? true : false}
        text="TICK"
      />
    </div>
  );
}
