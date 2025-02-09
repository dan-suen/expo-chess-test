import styles from '../styles/index.styles';
import { View } from 'react-native';
import { useSettings } from '@/app/context/SettingsContext';
import { ImageBackground, Dimensions } from 'react-native';
import createBoard, { Square } from '../components/Board';
import boardStyles from '../styles/Board.styles';
import React from 'react';
import { useEffect } from 'react';

function App() {
  const {
    selectedImage,
    PlaceholderImage,
    lightDark,
    playerBlack,
    getStockfishMove,
    chess,
    gameStart,
  } = useSettings();
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
  const squareSize = Dimensions.get('window').width / 10;
  useEffect(() => {
    if (playerBlack) {
      getStockfishMove('First');
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
            maxHeight: 1000,
            maxWidth: 1000,
          },
        ]}
      >
        {!gameStart
          ? createBoard(chess).map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={[
                  boardStyles.row,
                  {
                    height: squareSize * 10,
                    width: squareSize * 10,
                    maxHeight: 1000,
                    maxWidth: 1000,
                  },
                ]}
              >
                {row.map((square, colIndex) => (
                  <React.Fragment key={colIndex}>
                    <Square
                      object={square}
                      colIndex={colIndex}
                      create={false}
                    />
                  </React.Fragment>
                ))}
              </View>
            ))
          : playerBlack
          ? createBoard(chess)
              .map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  style={[
                    boardStyles.row,
                    {
                      height: squareSize * 10,
                      width: squareSize * 10,
                      maxHeight: 1000,
                      maxWidth: 1000,
                    },
                  ]}
                >
                  {row
                    .map((square, colIndex) => (
                      <React.Fragment key={colIndex}>
                        <Square
                          object={square}
                          colIndex={colIndex}
                          create={true}
                        />
                      </React.Fragment>
                    ))
                    .reverse()}
                </View>
              ))
              .reverse()
          : createBoard(chess).map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={[
                  boardStyles.row,
                  {
                    height: squareSize * 10,
                    width: squareSize * 10,
                    maxHeight: 1000,
                    maxWidth: 1000,
                  },
                ]}
              >
                {row.map((square, colIndex) => (
                  <React.Fragment key={colIndex}>
                    <Square object={square} colIndex={colIndex} create={true} />
                  </React.Fragment>
                ))}
              </View>
            ))}
      </View>
    </ImageBackground>
  );
}

export default App;
