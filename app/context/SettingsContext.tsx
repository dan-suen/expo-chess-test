import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { ImageSourcePropType, View, Dimensions, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { Chess } from 'chess.js';
//import StockfishModule from "@/modules/stockfish";
import StockfishModule from '@/app/function/serverpost';
import { FontAwesome6 } from '@expo/vector-icons';

const chess = new Chess();

interface Piece {
  square: string;
  type: string;
  color: string;
}
interface ElementObject {
  [key: string]: JSX.Element | null;
}
type SettingsContextType = {
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  PlaceholderImage: ImageSourcePropType;
  lightDark: string;
  setLightDark: React.Dispatch<React.SetStateAction<'Light' | 'Dark'>>;
  playerBlack: boolean;
  setPlayerBlack: React.Dispatch<React.SetStateAction<boolean>>;
  pieces: (Piece | null)[][];
  setPieces: React.Dispatch<React.SetStateAction<Piece | null>>;
  takenPieces: string[];
  setTakenPieces: React.Dispatch<React.SetStateAction<string[]>>;
  squareRefs: React.RefObject<View>[];
  setSquareRefs: React.Dispatch<
    React.SetStateAction<
      | React.RefObject<View>[]
      | ((prev: React.RefObject<View>[]) => React.RefObject<View>[])
    >
  >;
  elements: ElementObject;
  setElements: React.Dispatch<React.SetStateAction<ElementObject>>;
  appReady: boolean;
  setAppReady: React.Dispatch<React.SetStateAction<boolean>>;
  currentSound: React.MutableRefObject<Audio.Sound | null>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  PlaceholderMusic: string;
  currentSoundFile: string | null;
  setCurrentSoundFile: React.Dispatch<React.SetStateAction<string | null>>;
  selectMusic: () => void;
  resetMusic: () => void;
  chess: Chess;
  getStockfishMove: (type: string) => Promise<string>;
  activeRef: React.RefObject<typeof FontAwesome6 | null>;
  gameStart: boolean;
  setGameStart: React.Dispatch<React.SetStateAction<boolean>>;
  boardSize: number;
  setBoardSize: React.Dispatch<React.SetStateAction<number>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const SettingsContext = createContext<SettingsContextType | null>(null);
const { width, height } = Dimensions.get('window');
const adjustedHeight = height * 0.8;

const SettingsProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [playerBlack, setPlayerBlack] = useState<boolean>(false);
  const PlaceholderImage = require('@/assets/images/background-image.jpg');
  const [lightDark, setLightDark] = useState<'Light' | 'Dark'>('Light');
  const [takenPieces, setTakenPieces] = useState<string[]>([]);
  const [appReady, setAppReady] = useState<boolean>(false);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const currentSound = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const PlaceholderMusic = '../../assets/alone-296348.mp3';
  const activeRef = useRef<typeof FontAwesome6 | null>(null);
  const [text, setText] = useState<string>('Welcome to Chess Expo');
  const [currentSoundFile, setCurrentSoundFile] = useState<string | null>(null);
  const isFirstRender = useRef(true);
  const [boardSize, setBoardSize] = useState(
    Math.min(width, adjustedHeight) / 10
  );
  async function getStockfishMove(command: string) {
    try {
      let result = StockfishModule.sendCommand(command, chess, setText);
      return result;
    } catch (error) {
      //console.log(chess.history())
      console.error('Error:', error);
    }
  }
  const loadBackgroundImage = async () => {
    try {
      const imageUri = await AsyncStorage.getItem('backgroundImage');
      return imageUri;
    } catch (error) {
      console.error('Error loading background image:', error);
      return null;
    }
  };
  const loadDefaultMusic = async () => {
    try {
      const musicUri = await AsyncStorage.getItem('backgroundmusic');
      return musicUri;
    } catch (error) {
      console.error('Error loading background music:', error);
      return null;
    }
  };
  const loadMusic = async () => {
    try {
      const soundFile = currentSoundFile
        ? { uri: currentSoundFile }
        : require(PlaceholderMusic);
      if (!currentSound.current) {
        const { sound } = await Audio.Sound.createAsync(soundFile, {
          shouldPlay: true,
        });
        await sound.setIsLoopingAsync(true);
        currentSound.current = sound;
      } else {
        await currentSound.current.stopAsync();
        await currentSound.current.unloadAsync();
        await currentSound.current.loadAsync(soundFile);
        await currentSound.current.setIsLoopingAsync(true);
        await currentSound.current.playAsync();
      }
    } catch (error) {
      console.error('Error loading or playing sound:', error);
    }
  };
  const selectMusic = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });
      if (result.canceled === true) {
        console.log('File selection was canceled');
        return;
      }
      const allowedExtensions = ['.mp3', '.flac'];
      const fileExtension = result.assets[0].name.split('.').pop();
      if (fileExtension && allowedExtensions.includes(`.${fileExtension}`)) {
        setCurrentSoundFile(result.assets[0].uri);
        await AsyncStorage.setItem('backgroundmusic', result.assets[0].uri);
      }
    } catch (err) {
      console.error('Error picking file');
    }
  };
  const resetMusic = async () => {
    setCurrentSoundFile(null);
    await AsyncStorage.removeItem('backgroundmusic');
  };
  // useEffect(() => {
  //   const updateSize = () => {
  //     setBoardSize(Math.min(width, adjustedHeight));
  //   };

  //   const subscription = Dimensions.addEventListener('change', updateSize);

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      const imageUri = await loadBackgroundImage();
      if (imageUri) setSelectedImage(imageUri);
    };
    const fetchBackgroundMusic = async () => {
      const musicUri = await loadDefaultMusic();
      musicUri ? setCurrentSoundFile(musicUri) : loadMusic();
    };

    fetchBackgroundImage();
    fetchBackgroundMusic();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    loadMusic();
  }, [currentSoundFile]);
  return (
    <SettingsContext.Provider
      value={{
        selectedImage,
        setSelectedImage,
        PlaceholderImage,
        lightDark,
        setLightDark,
        playerBlack,
        setPlayerBlack,
        takenPieces,
        setTakenPieces,
        appReady,
        setAppReady,
        currentSound,
        isPlaying,
        setIsPlaying,
        PlaceholderMusic,
        currentSoundFile,
        setCurrentSoundFile,
        selectMusic,
        resetMusic,
        chess,
        getStockfishMove,
        activeRef,
        gameStart,
        setGameStart,
        boardSize,
        setBoardSize,
        text,
        setText,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within an SettingsProvider');
  }
  return context;
};

export default SettingsProvider;

export { Piece, ElementObject, useSettings };
