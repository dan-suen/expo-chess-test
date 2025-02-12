import styles from '../styles/index.styles';
import { View, Text } from 'react-native';
import { useSettings } from '@/app/context/SettingsContext';
import { ImageBackground, Dimensions, Pressable } from 'react-native';
import createBoard, { Square } from '../components/Board';
import boardStyles from '../styles/Board.styles';
import React from 'react';
import { useEffect, useState } from 'react';
import buttonStyles from '../styles/Button.styles';
import { FontAwesome6 } from '@expo/vector-icons';

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
  const [var3, setVar3] = useState<string | null>(null);
  const [showPromotion, setShowPromotion] = useState<boolean>(false);
  const [var2Changed, setVar2Changed] = useState(false);
  const [possiblePromotion, setPossiblePromotion]= useState(false);
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
    if (var1 !== null && var2 !== null) {
      //console.log(`hitting this ${var3}`)
      if (var3) {
        //console.log(`about to 1: ${var1}${var2}${var3}`);
        getStockfishMove(`${var1}${var2}${var3}`);
        setVar1(null);
        setVar2(null);
        setVar3(null);
        setVar2Changed(false);
      } else {
        //console.log(`about to : ${var1}${var2}`);
        getStockfishMove(`${var1}${var2}`);
        setVar1(null);
        setVar2(null);
        setVar2Changed(false);
      }
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
          maxHeight: '20%',
          width: '80%',
          backgroundColor: 'white',
          borderRadius: 16,
          borderColor: 'black',
          borderWidth: 3,
        }}
      >
        <Text
          style={{
            fontSize: squareSize / 3,
            marginLeft: 10,
            // height: '10%',
            // maxHeight: '10%',
          }}
        >
          {text}
        </Text>
      </View>
      {showPromotion ? (
        <View
          style={{
            height: '5%',
            maxHeight: '5%',
            width: '80%',
            backgroundColor:"lightblue",
            borderRadius: 16,
            borderColor: 'black',
            borderWidth: 3,
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <Pressable
            style={[buttonStyles.button, { backgroundColor: playerBlack? "white" : "black", flex:1 }]}
            onPress={() => {
              setVar3('n')
              setShowPromotion(false)
              setVar2Changed(true);
            }}
          >
            <FontAwesome6
              name={`chess-knight`}
              size={squareSize/4}
              color= {playerBlack  ? "black" : "white"}
              style={buttonStyles.buttonIcon}
            />
            <Text style={[{ color:  playerBlack ? "black" : "white" }]}>
              {'Knight'}
            </Text>
          </Pressable>

          <Pressable
            style={[buttonStyles.button, { backgroundColor: playerBlack? "white" : "black", flex:1 }]}
            onPress={() => {
              setVar3('b')
              setShowPromotion(false)
              setVar2Changed(true);
            }}
          >
            <FontAwesome6
              name={`chess-bishop`}
              size={squareSize/4}
              color= {playerBlack  ? "black" : "white"}
              style={buttonStyles.buttonIcon}
            />
            <Text style={[buttonStyles.buttonLabel, { color:  playerBlack ? "black" : "white" }]}>
              {'Bishop'}
            </Text>
          </Pressable>
          <Pressable
            style={[buttonStyles.button, { backgroundColor: playerBlack? "white" : "black", flex:1 }]}
            onPress={() => {
              setVar3('r')
              setShowPromotion(false)
              setVar2Changed(true);
            }}
          >
            <FontAwesome6
              name={`chess-rook`}
              size={squareSize/4}
              color= {playerBlack  ? "black" : "white"}
              style={buttonStyles.buttonIcon}
            />
            <Text style={[buttonStyles.buttonLabel, { color:  playerBlack ? "black" : "white" }]}>
              {'Rook'}
            </Text>
          </Pressable>
          <Pressable
            style={[buttonStyles.button, { backgroundColor: playerBlack? "white" : "black", flex:1 }]}
            onPress={() => {
              setVar3('q')
              setShowPromotion(false)
              setVar2Changed(true);
            }}
          >
            <FontAwesome6
              name={`chess-queen`}
              size={squareSize/4}
              color= {playerBlack ? "black" : "white"}
              style={buttonStyles.buttonIcon}
            />
            <Text style={[buttonStyles.buttonLabel, { color:  playerBlack ? "black" : "white" }]}>
              {'Queen'}
            </Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
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
        {!gameStart
          ? createBoard(chess).map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={[
                  boardStyles.row,
                  {
                    height: squareSize * 10,
                    width: squareSize * 10,
                    maxHeight: squareSize * 10,
                    maxWidth: squareSize * 10,
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
                      maxHeight: squareSize * 10,
                      maxWidth: squareSize * 10,
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
                          setVar2Changed={setVar2Changed}
                          setShowPromotion={setShowPromotion}
                          turn={chess.turn()}
                          playerBlack={playerBlack}
                          showPromotion={showPromotion}
                          possiblePromotion={possiblePromotion}
                          setPossiblePromotion={setPossiblePromotion}
                          chess={chess}   
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
                    maxHeight: squareSize * 10,
                    maxWidth: squareSize * 10,
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
                      setShowPromotion={setShowPromotion}
                      setVar2Changed={setVar2Changed}
                      turn={chess.turn()}
                      playerBlack={playerBlack}
                      showPromotion={showPromotion}
                      possiblePromotion={possiblePromotion}
                      setPossiblePromotion={setPossiblePromotion}
                      chess={chess}
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
