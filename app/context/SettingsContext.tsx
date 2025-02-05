import React, { createContext, useContext, useState } from "react";
import { ImageSourcePropType } from 'react-native';

type SettingsContextType = {
    selectedImage: string | null;
    setSelectedImage: (image: string) => void;
    PlaceholderImage: ImageSourcePropType;
    lightDark: string,
    setlightDark: (mode: "Light" | "Dark") => void;
    playerBlack:boolean;
    setPlayerBlack: (mode: boolean) => void;
  };
  
const SettingsContext = createContext<SettingsContextType | null>(null);


const initialPositions: (string | null)[] = [
  'WRook', 'WKnight', 'WBishop', 'WQueen', 'WKing', 'WBishop', 'WKnight', 'WRook',
  'WPawn', 'WPawn', 'WPawn', 'WPawn', 'WPawn', 'WPawn', 'WPawn', 'WPawn',
  null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null,
  'BPawn', 'BPawn', 'BPawn', 'BPawn', 'BPawn', 'BPawn', 'BPawn', 'BPawn',
  'BRook', 'BKnight', 'BBishop', 'BQueen', 'BKing', 'BBishop', 'BKnight', 'BRook'
];













const SettingsProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [playerBlack, setPlayerBlack] = useState<boolean>(false);
  const PlaceholderImage = require('@/assets/images/background-image.jpg'); 
  const [lightDark, setlightDark] = useState<"Light" | "Dark">("Light");
  return (
    <SettingsContext.Provider value={{ selectedImage, setSelectedImage, PlaceholderImage, lightDark, setlightDark, playerBlack, setPlayerBlack }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within an SettingsProvider");
  }
  return context;
};

export default SettingsProvider;

export { useSettings };