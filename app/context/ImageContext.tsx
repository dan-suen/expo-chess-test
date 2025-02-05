import React, { createContext, useContext, useState } from "react";
import { ImageSourcePropType } from 'react-native';

type ImageContextType = {
    selectedImage: string | null;
    setSelectedImage: (image: string) => void;
    PlaceholderImage: ImageSourcePropType;
  };
  
const ImageContext = createContext<ImageContextType | null>(null);

const ImageProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const PlaceholderImage = require('@/assets/images/background-image.jpg'); 
  return (
    <ImageContext.Provider value={{ selectedImage, setSelectedImage, PlaceholderImage }}>
      {children}
    </ImageContext.Provider>
  );
};

const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
};

export default ImageProvider;

export { useImage };