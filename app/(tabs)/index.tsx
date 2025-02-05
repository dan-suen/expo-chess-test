import styles from '../styles/index.styles';
import { View } from 'react-native';
import { useImage } from '@/app/context/ImageContext';
import { ImageBackground } from 'react-native';

function App() {
  const { selectedImage, PlaceholderImage } = useImage();
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
  return (
    <ImageBackground source={imageSource} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.imageContainer}></View>
      </View>
    </ImageBackground>
  );
}

export default App;
