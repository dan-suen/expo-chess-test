import { Text, View } from 'react-native';
import { useSettings } from '@/app/context/SettingsContext';
import { ImageBackground } from 'react-native';
import aboutStyles from '../styles/about.styles';
import { useState } from 'react';

export default function AboutScreen() {
  const { selectedImage, PlaceholderImage, lightDark, getStockfishMove, chess } =
  useSettings();
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
  const [currentIndex, setCurrentIndex] = useState(0);
  const commands = [
    'New',
    'First',
    'End',
    'New',
    'e2e4',
    'End',
    'e2e4',
    'e7e5',
    'a1a8',
    'g1f3',
    'h9h1',
    'd7d5',
    'e3e9',
    'b1c3',
    'f8b4',
    'z2z4',
    'New',
    'e2e4',
    'End',
  ];

  const handleButtonClick = () => {
    const currentCommand = commands[currentIndex];
    getStockfishMove(currentCommand); 
    setCurrentIndex((prevIndex) => (prevIndex + 1) % commands.length); 
    chess.ascii()
  };
  return (
    <ImageBackground source={imageSource} style={aboutStyles.backgroundImage}>
      <View
        style={[
          aboutStyles.overlay,
          {
            backgroundColor:
              lightDark === 'Light'
                ? 'rgba(255, 253, 253, 0.5)'
                : 'rgba(0, 0, 0, 0.5)',
          },
        ]}
      />
      <View style={aboutStyles.container}>
        <Text style={aboutStyles.text}>
          This is a TypeScript-based chess game built using ReactNative and
          Expo. The game allows replicating important features such as *en
          passant*, castling, etc.
        </Text>
        <button onClick={handleButtonClick}>Send Next Command</button>
      </View>
    </ImageBackground>
  );
}
