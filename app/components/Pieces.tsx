import Fontawesome5 from '@expo/vector-icons/FontAwesome5';
import { View } from 'react-native';
import { PiecesObject } from '../context/SettingsContext';


const handlePress = () => {
    console.log("Pressed!"); // Handle press for both parent and child
  };

const createPieces = (pieces:PiecesObject, squareRefs:React.RefObject<View>[]) => {
    for (let i = 0 ; i< squareRefs.length; i++) {
        const location: string = squareRefs[i].current?.id || null;
        if (pieces[location]){
            const color = pieces[location][0];
            const piece = pieces[location].slice(1);
            const element = <Fontawesome5 name={`chess-${piece}`} color={color} onPress = {handlePress}/>
            console.log(squareRefs[i].current)
        }
    }
};

export default createPieces;