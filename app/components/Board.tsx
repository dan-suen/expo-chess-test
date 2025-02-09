import { View, Text, Pressable, Dimensions } from 'react-native';
import boardStyles from '../styles/Board.styles';
import Fontawesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { Chess } from 'chess.js';

const map: { [key: string]: string } = {
  p: 'pawn',
  r: 'rook',
  b: 'bishop',
  n: 'knight',
  q: 'queen',
  k: 'king',
};
const letters = 'abcdefgh';
interface MyObject {
  color?: string;
  object?: { [key: string]: string } | null;
  [key: string]: string | number | null | { [key: string]: string } | undefined;
}
interface PieceProps {
  color: string;
  piece: string;
}
const pieceSize = Dimensions.get('window').width / 20;
const createBoard = (chess: Chess) => {
  console.log('hit hit hit ');
  const letters = 'abcdefgh';
  const board: MyObject[][] = [];
  const pieces = chess.board();
  for (let row = 1; row <= 10; row++) {
    const rowArray = [];
    for (let col = 1; col <= 10; col++) {
      const object: MyObject = {};
      if (row === 1 || row === 10 || col === 1 || col === 10) {
        object.color = '#A0A0A0';
        if (col >= 2 && col <= 9 && (row === 1 || row === 10)) {
          object.col = letters[col - 2];
        } else if (row >= 2 && row <= 9 && (col === 1 || col === 10)) {
          object.row = row - 1;
        }
      } else {
        object.row = row - 1;
        object.col = letters[col - 2];
        if (pieces && pieces[9 - row] && pieces[9 - row][col - 2]) {
          object.pieceData = pieces[9 - row ][col - 2];
        } else {
          object.pieceData = null;
        }

        object.color = (row % 2 === 0 ? !(col % 2 === 0) : col % 2 === 0)
          ? 'brown'
          : 'gray';
      }
      rowArray.push(object);
    }
    board.unshift(rowArray);
  }
  return board;
};

const Piece: React.FC<PieceProps> = ({ color, piece }) => {
  if (color && piece) {
    return (
      <Pressable>
        <Fontawesome6
          style={{
            alignItems: 'anchor-center',
          }}
          size={pieceSize}
          name={`chess-${map[piece]}`}
          color={color === 'w' ? 'white' : 'black'}
        />
      </Pressable>
    );
  } else {
    return <></>;
  }
};

const Square = ({
  object,
  colIndex,
  create,
}: {
  object: MyObject;
  colIndex: number;
  create: boolean;
}) => {
  const id = String(object.col || '') + String(object.row || '');
  if (object.pieceData){
    console.log("row: ", object.row)
    console.log("col: ", object.col)
    console.log("pieceData: ", object.pieceData)
  }
  return (
    <View
      key={colIndex}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: object.color,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {id.length === 1 ? (
        <Text style={[boardStyles.text, {fontSize: pieceSize/2}]}>{id}</Text>
      ) : id.length === 2 && create ? (
        <Piece
          color={object.pieceData?.color || ''}
          piece={object.pieceData?.type || ''}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default createBoard;
export { Square };
