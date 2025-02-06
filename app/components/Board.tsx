import { View } from 'react-native';
import { useRef } from 'react';

interface MyObject {
  color?: string;
  [key: string]: string | number | null;
}

const createBoard = () => {
  const letters = 'abcdefgh';
  const board: MyObject[][] = [];
  for (let row = 1; row <= 10; row++) {
    const rowArray = [];
    for (let col = 1; col <= 10; col++) {
      const object: MyObject = {};
      if ((row === 1 || row === 10 ) || (col === 1 || col === 10)) {
        object.color = 'A0A0A0';
        if (col >= 2 && col <= 9 && (row === 1 || row === 10 ) ) {
          object.col = letters[col - 2]; 
        } else if (row >= 2 && row <= 9 && (col === 1 || col === 10)) {
          object.row = row - 1; 
        }
      } else {
        object.row = row - 1;
        object.col = letters[col - 2];
        object.color = (row % 2 === 0 ? !(col % 2 === 0) : col % 2 === 0)
          ? 'ffffff'
          : '000000';
      }
      rowArray.push(object);
    }
    board.push(rowArray);
  }
  return board;
};

const renderSquare = (
  object: MyObject,
  squareSize: number,
  colIndex: number
) => {
  const squareRef = useRef<View>(null);
  if (squareRef.current) {
    squareRef.current.id = String(object.row) + String(object.col);
  }
  return (
    <View
      key={colIndex}
      ref={squareRef}
      style={{
        width: squareSize,
        height: squareSize,
        backgroundColor: object.color,
      }}
    />
  );
};

export { createBoard, renderSquare };
