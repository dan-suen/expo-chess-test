import styles from '../styles/index.styles';
import { View, Text } from 'react-native';
import { useSettings } from '@/app/context/SettingsContext';
import { ImageBackground, Dimensions } from 'react-native';
import createBoard, { Square } from '../components/Board';
import boardStyles from '../styles/Board.styles';
import React from 'react';
import { useEffect, useState } from 'react';

function App() {
  const {
    selectedImage,
    PlaceholderImage,
    lightDark,
    playerBlack,
    getStockfishMove,
    chess,
    gameStart,
    text,
  } = useSettings();
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
  const squareSize = Dimensions.get('window').width / 10;
  const [var1, setVar1] = useState<string | null>(null);
  const [var2, setVar2] = useState<string | null>(null);
  const [var2Changed, setVar2Changed] = useState(false);
  // const [, forceRerender] = useState(0);

  // const triggerRerender = () => {
  //   forceRerender(prev => prev + 1);
  // };
  useEffect(() => {
    if (playerBlack) {
      getStockfishMove('First');
    }
  }, [playerBlack]);
  useEffect(() => {
    //console.log(var1)
    if (var1 !== null && var2 !== null) {
      console.log(`about to : ${var1}${var2}`)
      getStockfishMove(`${var1}${var2}`);
      setVar1(null);
      setVar2(null);
      setVar2Changed(false);
    }
  }, [var1, var2Changed]);
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
        style={{
          height: '10%',
          width: '80%',
          backgroundColor: 'white',
          borderRadius: 16,
          borderColor: 'black',
          borderWidth: 3,
        }}
      >
        <Text style={{ fontSize: squareSize / 3, marginLeft: 10 }}>{text}</Text>
      </View>
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
                          var1={var1}
                          setVar1={setVar1}
                          setVar2={setVar2}
                          setVar2Changed = {setVar2Changed}
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
                    <Square
                      object={square}
                      colIndex={colIndex}
                      create={true}
                      var1={var1}
                      setVar1={setVar1}
                      setVar2={setVar2}
                      setVar2Changed = {setVar2Changed}
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
