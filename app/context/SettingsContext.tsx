import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { ImageSourcePropType, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { Chess } from 'chess.js';
//import StockfishModule from "@/modules/stockfish";
import StockfishModule from "@/app/function/serverpost";
import createPieces from '../components/Pieces';
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
  setSelectedImage: (image: string | null) => void;
  PlaceholderImage: ImageSourcePropType;
  lightDark: string;
  setLightDark: (mode: 'Light' | 'Dark') => void;
  playerBlack: boolean;
  setPlayerBlack: (mode: boolean) => void;
  pieces: (Piece|null)[][];
  setPieces: (object: (Piece|null)[][]) => void;
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
  activeRef:React.RefObject<typeof FontAwesome6 | null>;
};

const SettingsContext = createContext<SettingsContextType | null>(null);


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
  const [pieces, setPieces] = useState<(Piece|null)[][]>(chess.board());
  const [takenPieces, setTakenPieces] = useState<string[]>([]);
  const [squareRefs, setSquareRefs] = useState<React.RefObject<View>[]>([]);
  const [elements, setElements] = useState<ElementObject>({});
  const [appReady, setAppReady] = useState<boolean>(false);
  const currentSound = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const PlaceholderMusic = '../../assets/06.mp3';
  const activeRef = useRef<typeof FontAwesome6 | null>(null);
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
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    createPieces(pieces, squareRefs, setElements, activeRef);
  }, [pieces]);
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
        getStockfishMove,
        activeRef
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
