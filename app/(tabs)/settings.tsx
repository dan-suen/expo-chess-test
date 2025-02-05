import { Text, View } from 'react-native';
import { useImage } from '@/app/context/ImageContext';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/app/components/Button';
import settingstyles from '../styles/settings.styles';
import { ImageBackground } from 'react-native';

export default function Settings() {
  const { selectedImage, setSelectedImage, PlaceholderImage } = useImage();
  const imageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage;
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  return (
    <ImageBackground source={imageSource} style={settingstyles.backgroundImage}>
      <View style={settingstyles.container}>
        <Text style={settingstyles.text}>Settings</Text>
        <View style={settingstyles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Button label="Use this photo" />
        </View>
      </View>
    </ImageBackground>
  );
}
