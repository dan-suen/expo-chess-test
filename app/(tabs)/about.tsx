import { Text, View, StyleSheet } from 'react-native';
import { useImage } from '@/app/context/ImageContext';
import { ImageBackground } from 'react-native';

export default function AboutScreen() {
  const { selectedImage, PlaceholderImage } = useImage();
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
  return (
    <ImageBackground source={imageSource} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text}>About screen</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
});
