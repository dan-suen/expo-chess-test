import styles from '../styles/index.styles';
import { View } from 'react-native';
import { useSettings } from '@/app/context/SettingsContext';
import { ImageBackground, Dimensions } from 'react-native';
import {createBoard, renderSquare} from '../components/Board';
import boardStyles from '../styles/Board.styles';
import React from 'react';

function App() {
  const { selectedImage, PlaceholderImage, lightDark, playerBlack } = useSettings();
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
  const squareSize = Dimensions.get('window').width / 10;
  console.log(createBoard());
  return (
    <ImageBackground source={imageSource} style={styles.backgroundImage}>
      <View
        style={[
          styles.overlay,
          { backgroundColor: lightDark === "Light" ? "rgba(255, 253, 253, 0.5)" : "rgba(0, 0, 0, 0.5)" },
        ]}
      />
      <View style={styles.container}>
        {createBoard().map((row, rowIndex) => (
          <View key={rowIndex} style={boardStyles.row}>
            {row.map((square, colIndex) => (
              <React.Fragment key={colIndex}>{renderSquare(square, squareSize, colIndex)}</React.Fragment>
            ))}
          </View>
        ))}
      </View>
    </ImageBackground>
  );
}

export default App;
