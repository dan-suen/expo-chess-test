import React, { createContext, useContext, useState } from 'react';
import { ImageSourcePropType, View } from 'react-native';
interface PiecesObject {
  [key: string]: string | null;
}

type SettingsContextType = {
  selectedImage: string | null;
  setSelectedImage: (image: string) => void;
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
};

const SettingsContext = createContext<SettingsContextType | null>(null);

const initialPositions: PiecesObject = {
  a1: 'Wrook',
  b1: 'Wknight',
  c1: 'Wbishop',
  d1: 'Wqueen',
  e1: 'Wking',
  f1: 'Wbishop',
  g1: 'Wknight',
  h1: 'Wrook',
  a2: 'Wpawn',
  b2: 'Wpawn',
  c2: 'Wpawn',
  d2: 'Wpawn',
  e2: 'Wpawn',
  f2: 'Wpawn',
  g2: 'Wpawn',
  h2: 'Wpawn',
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
  a7: 'Bpawn',
  b7: 'Bpawn',
  c7: 'Bpawn',
  d7: 'Bpawn',
  e7: 'Bpawn',
  f7: 'Bpawn',
  g7: 'Bpawn',
  h7: 'Bpawn',
  a8: 'Brook',
  b8: 'Bknight',
  c8: 'Bbishop',
  d8: 'Bqueen',
  e8: 'Bking',
  f8: 'Bbishop',
  g8: 'Bknight',
  h8: 'Brook',
};

const SettingsProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [playerBlack, setPlayerBlack] = useState<boolean>(false);
  const PlaceholderImage = require('@/assets/images/background-image.jpg');
  const [lightDark, setLightDark] = useState<'Light' | 'Dark'>('Light');
  const [pieces, setPieces] = useState<PiecesObject>(initialPositions);
  const [takenPieces, setTakenPieces] = useState<string[]>([]);
  const [squareRefs, setSquareRefs] = useState<React.RefObject<View>[]>([]);
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

export { PiecesObject, useSettings };
