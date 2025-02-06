import Fontawesome5 from '@expo/vector-icons/FontAwesome5';
import { View } from 'react-native';
import { ElementObject, PiecesObject } from '../context/SettingsContext';

const handlePress = () => {
  console.log('Pressed!'); // Handle press for both parent and child
};

const createPieces = (
  pieces: PiecesObject,
  squareRefs: React.RefObject<View>[],
  setElements: React.Dispatch<React.SetStateAction<ElementObject>>
) => {
  const elements: ElementObject = {};
  for (let i = 0; i < squareRefs.length; i++) {
    const location: string = squareRefs[i].current?.id || null;
    if (pieces[location]) {
      const color = pieces[location][0];
      const piece = pieces[location].slice(1);
      elements[location] = (
        <Fontawesome5
          name={`chess-${piece}`}
          color={color}
          onPress={handlePress}
        />
      );
      
    }
  }
  setElements(elements);
};

export default createPieces;
