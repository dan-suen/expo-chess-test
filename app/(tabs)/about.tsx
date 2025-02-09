import { Text, View } from 'react-native';
import { useSettings } from '@/app/context/SettingsContext';
import { ImageBackground } from 'react-native';
import aboutStyles from '../styles/about.styles';

export default function AboutScreen() {
  const { selectedImage, PlaceholderImage, lightDark} =
  useSettings();
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
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
