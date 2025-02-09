import styles from '../styles/index.styles';
import { View } from 'react-native';
import { useSettings } from '@/app/context/SettingsContext';
import { ImageBackground, Dimensions } from 'react-native';
import createBoard, { Square } from '../components/Board';
import boardStyles from '../styles/Board.styles';
import React from 'react';
import { useEffect} from 'react';


function App() {
  const {
    selectedImage,
    PlaceholderImage,
    lightDark,
    playerBlack,
    pieces,
    getStockfishMove,
    chess
  } = useSettings();
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
  const squareSize = Dimensions.get('window').width / 10;
   useEffect(() => {
      if(playerBlack) {
        getStockfishMove("First")
      } 
    }, [playerBlack]);
  return (
    <ImageBackground source={imageSource} style={styles.backgroundImage}>
      <View
        style={[
          styles.overlay,
          {
            backgroundColor:
              lightDark === 'Light'
                ? 'rgba(255, 253, 253, 0.5)'
                : 'rgba(0, 0, 0, 0.5)',
          },
        ]}
      />
      <View
        style={[
          boardStyles.board,
          {
            height: squareSize * 10,
            width: squareSize * 10,
            maxHeight: squareSize * 10,
            maxWidth: squareSize * 10,
          },
        ]}
      >
        {playerBlack
          ? createBoard()
              .map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  style={[
                    boardStyles.row,
                    { maxHeight: squareSize, width: squareSize * 10 },
                  ]}
                >
                  {row
                    .map((square, colIndex) => (
                      <React.Fragment key={colIndex}>
                        <Square
                          object={square}
                          squareSize={squareSize}
                          colIndex={colIndex}
                        />
                      </React.Fragment>
                    ))
                    .reverse()}
                </View>
              ))
              .reverse()
          : createBoard().map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={[
                  boardStyles.row,
                  { maxHeight: squareSize, width: squareSize * 10 },
                ]}
              >
                {row.map((square, colIndex) => (
                  <React.Fragment key={colIndex}>
                    <Square
                      object={square}
                      squareSize={squareSize}
                      colIndex={colIndex}
                    />
                  </React.Fragment>
                ))}
              </View>
            ))}
      </View>
    </ImageBackground>
  );
}

export default App;
