import { Text, View } from 'react-native';
import { useSettings } from '@/app/context/SettingsContext';
import { ImageBackground } from 'react-native';
import aboutStyles from '../styles/about.styles';
import { useEffect } from 'react';

export default function AboutScreen() {
  const { selectedImage, PlaceholderImage, lightDark, getStockfishMove } =
    useSettings();
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
  useEffect(() => {
    getStockfishMove('New');
    getStockfishMove('First');
    getStockfishMove('End');
    getStockfishMove('New');
    getStockfishMove('e2e4');
    getStockfishMove('End');
    getStockfishMove('e2e4');
    getStockfishMove('e7e5');
    getStockfishMove('a1a8');
    getStockfishMove('g1f3');
    getStockfishMove('h9h1');
    getStockfishMove('d7d5');
    getStockfishMove('e3e9');
    getStockfishMove('b1c3');
    getStockfishMove('f8b4');
    getStockfishMove('z2z4');
    getStockfishMove('New');
    getStockfishMove('e2e4');
    getStockfishMove('End');
  }, []);
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
      </View>
    </ImageBackground>
  );
}
