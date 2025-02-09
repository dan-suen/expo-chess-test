import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { ImageSourcePropType, View, AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { Chess } from 'chess.js';
//import StockfishModule from "@/modules/stockfish";
import StockfishModule from "@/app/function/serverpost";

const chess = new Chess();


interface PiecesObject {
  [key: string]: string | null;
}
interface ElementObject {
  [key: string]: JSX.Element | null;
}
type SettingsContextType = {
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  PlaceholderImage: ImageSourcePropType;
  lightDark: string;
  setLightDark: (mode: 'Light' | 'Dark') => void;
  playerBlack: boolean;
  setPlayerBlack: (mode: boolean) => void;
  pieces: PiecesObject;
  setPieces: (object: PiecesObject) => void;
  initialPositions: PiecesObject;
  takenPieces: string[];
  setTakenPieces: (pieces: string[]) => void;
  squareRefs: React.RefObject<View>[];
  setSquareRefs: (
    updater:
      | React.RefObject<View>[]
      | ((prev: React.RefObject<View>[]) => React.RefObject<View>[])
  ) => void;
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
  getStockfishMove: (command:string) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

const initialPositions: PiecesObject = {
  a1: 'WR',
  b1: 'WN',
  c1: 'WB',
  d1: 'WQ',
  e1: 'WK',
  f1: 'WB',
  g1: 'WN',
  h1: 'WR',
  a2: 'WP',
  b2: 'WP',
  c2: 'WP',
  d2: 'WP',
  e2: 'WP',
  f2: 'WP',
  g2: 'WP',
  h2: 'WP',
  a3: null,
  b3: null,
  c3: null,
  d3: null,
  e3: null,
  f3: null,
  g3: null,
  h3: null,
  a4: null,
  b4: null,
  c4: null,
  d4: null,
  e4: null,
  f4: null,
  g4: null,
  h4: null,
  a5: null,
  b5: null,
  c5: null,
  d5: null,
  e5: null,
  f5: null,
  g5: null,
  h5: null,
  a6: null,
  b6: null,
  c6: null,
  d6: null,
  e6: null,
  f6: null,
  g6: null,
  h6: null,
  a7: 'BP',
  b7: 'BP',
  c7: 'BP',
  d7: 'BP',
  e7: 'BP',
  f7: 'BP',
  g7: 'BP',
  h7: 'BP',
  a8: 'BR',
  b8: 'BN',
  c8: 'BB',
  d8: 'BQ',
  e8: 'BK',
  f8: 'BB',
  g8: 'BN',
  h8: 'BR',
};
async function getStockfishMove(command: string) {
  try {
    return StockfishModule.sendCommand(command, chess);
  } catch (error) {
    console.error('Error:', error);
  }
}
const SettingsProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [playerBlack, setPlayerBlack] = useState<boolean>(false);
  const PlaceholderImage = require('@/assets/images/background-image.jpg');
  const [lightDark, setLightDark] = useState<'Light' | 'Dark'>('Light');
  const [pieces, setPieces] = useState<PiecesObject>(initialPositions);
  const [takenPieces, setTakenPieces] = useState<string[]>([]);
  const [squareRefs, setSquareRefs] = useState<React.RefObject<View>[]>([]);
  const [elements, setElements] = useState<ElementObject>({});
  const [appReady, setAppReady] = useState<boolean>(false);

  const currentSound = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const PlaceholderMusic = '../../assets/06.mp3';
  const [currentSoundFile, setCurrentSoundFile] = useState<string | null>(null);
  const isFirstRender = useRef(true);
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
        pieces,
        setPieces,
        initialPositions,
        takenPieces,
        setTakenPieces,
        squareRefs,
        setSquareRefs,
        elements,
        setElements,
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
        getStockfishMove
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

export { PiecesObject, ElementObject, useSettings };
