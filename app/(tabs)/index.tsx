import styles from '../styles/index.styles';
import { View } from 'react-native';
import { useSettings } from '@/app/context/SettingsContext';
import { ImageBackground } from 'react-native';

function App() {
  const { selectedImage, PlaceholderImage, lightDark } = useSettings();
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
  return (
    <ImageBackground source={imageSource} style={styles.backgroundImage}>
      <View
          style={[
            styles.overlay,
            { backgroundColor: lightDark === "Light" ? "rgba(255, 253, 253, 0.5)" : "rgba(0, 0, 0, 0.5)" },
          ]}
        />
      <View style={styles.container}>
        <View style={styles.imageContainer}></View>
      </View>
    </ImageBackground>
  );
}

export default App;
