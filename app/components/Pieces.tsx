import Fontawesome6 from '@expo/vector-icons/FontAwesome6';
import { View, Pressable } from 'react-native';
import { ElementObject, Piece } from '../context/SettingsContext';
import React from 'react';
const map: { [key: string]: string } = {
  p: 'pawn',
  r: 'rook',
  b: 'bishop',
  n: 'knight',
  q: 'queen',
  k: 'king',
};
const letters = "abcdefgh"
const createPieces = (
  pieces: (Piece | null)[][],
  squareRefs: React.RefObject<View>[],
  setElements: React.Dispatch<React.SetStateAction<ElementObject>>,
  activeRef: React.RefObject<typeof Fontawesome6>
) => {
  const elements: ElementObject = {};

  for (let i = 0; i < squareRefs.length; i++) {
    const location: string = squareRefs[i].current?.id || null;
    let data = pieces[letters.indexOf(location[0])][8-Number(location[1])]
    if (data) {
      const color = data.color;
      const piece = data.type;
      elements[location] = (
        <Pressable ref={activeRef}>
          <Fontawesome6
            size={34}
            name={`chess-${piece}`}
            color={color === 'w' ? 'white' : 'black'}
            style={{
              overflow: 'hidden',
            }}
          />
        </Pressable>
      );
    }
  }
  setElements(elements);
};

export default createPieces;
