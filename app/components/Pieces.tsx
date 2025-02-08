import Fontawesome6 from '@expo/vector-icons/FontAwesome6';
import { View, Pressable } from 'react-native';
import { ElementObject, PiecesObject } from '../context/SettingsContext';
import React from 'react';

const createPieces = (
  pieces: PiecesObject,
  squareRefs: React.RefObject<View>[],
  setElements: React.Dispatch<React.SetStateAction<ElementObject>>,
  activeRef: React.RefObject<typeof Fontawesome6>
) => {
  const elements: ElementObject = {};

  for (let i = 0; i < squareRefs.length; i++) {
    const location: string = squareRefs[i].current?.id || null;
    if (pieces[location]) {
      const color = pieces[location][0];
      const piece = pieces[location].slice(1);
      elements[location] = (
        <Pressable
          ref={activeRef}
          
        >
          <Fontawesome6
            size={34}
            name={`chess-${piece}`}
            color={color === 'W' ? 'white' : 'black'}
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
