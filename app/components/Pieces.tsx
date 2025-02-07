import Fontawesome6 from '@expo/vector-icons/FontAwesome6';
import { View, TouchableOpacity } from 'react-native';
import { ElementObject, PiecesObject } from '../context/SettingsContext';
import React from 'react';

const handlePress = (
  location: string,
  setActive: React.Dispatch<React.SetStateAction<string | null>>,
  activeRef: React.RefObject<typeof Fontawesome6>,
  color: string
) => {
  if (activeRef.current) {
    activeRef.current.setNativeProps({
      backgroundColor: activeRef ? 'blue' : color,
    });
  }
  console.log(activeRef);
  setActive((prevActive) => {
    const newActive = prevActive === location ? null : location;

    return newActive;
  });
};

const createPieces = (
  pieces: PiecesObject,
  squareRefs: React.RefObject<View>[],
  setElements: React.Dispatch<React.SetStateAction<ElementObject>>,
  setActive: React.Dispatch<React.SetStateAction<string | null>>,
  activeRef: React.RefObject<typeof Fontawesome6>
) => {
  const elements: ElementObject = {};

  for (let i = 0; i < squareRefs.length; i++) {
    const location: string = squareRefs[i].current?.id || null;
    if (pieces[location]) {
      const color = pieces[location][0];
      const piece = pieces[location].slice(1);
      elements[location] = (
        <TouchableOpacity
          ref={activeRef}
          onPress={() => handlePress(location, setActive, activeRef, color)}
        >
          <Fontawesome6
            size={34}
            name={`chess-${piece}`}
            color={color === 'W' ? 'white' : 'black'}
            style={{
              overflow: 'hidden',
            }}
          />
        </TouchableOpacity>
      );
    }
  }
  setElements(elements);
};

export default createPieces;
