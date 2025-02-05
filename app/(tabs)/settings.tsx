import { View } from 'react-native';
import { useSettings } from '@/app/context/SettingsContext';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/app/components/Button';
import settingstyles from '../styles/settings.styles';
import { ImageBackground } from 'react-native';
import { Button as IconButton, Icon } from '@rneui/themed';

export default function Settings() {
  const {
    selectedImage,
    setSelectedImage,
    PlaceholderImage,
    lightDark,
    setlightDark,
    playerBlack,
    setPlayerBlack
  } = useSettings();
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
    <ImageBackground
      source={imageSource}
      style={settingstyles.backgroundImage}
    >
      <View
          style={[
            settingstyles.overlay,
            { backgroundColor: lightDark === "Light" ? "rgba(255, 253, 253, 0.5)" : "rgba(0, 0, 0, 0.5)" },
          ]}
        />
      <View style={settingstyles.container}>
        <View style={settingstyles.footerContainer}>
          <Button label="Change Background" onPress={pickImageAsync} />
          <IconButton
            color={playerBlack ? 'white': 'black' }
            radius={'sm'}
            type="solid"
            titleStyle={{ color: playerBlack ? 'black':'white' }}
            onPress={() =>
              setPlayerBlack(!playerBlack)
            }
          >
            Play as {playerBlack ? 'White': 'Black'}
            <Icon
              name='chess-king'
              color={ playerBlack ? 'white': 'black' }
            />
          </IconButton>
          <IconButton
            color={lightDark === 'Light' ? 'black' : 'white'}
            radius={'sm'}
            type="solid"
            titleStyle={{ color: lightDark === "Light" ? "white": "black" }}
            onPress={() =>
              setlightDark(lightDark === 'Light' ? 'Dark' : 'Light')
            }
          >
            {lightDark == 'Light' ? 'Dark' : 'Light'} Mode
            <Icon
              name={lightDark === 'Light' ? 'dark-mode' : 'sunny'}
              color={lightDark === 'Light' ? 'white' : 'black'}
            />
          </IconButton>
        </View>
      </View>
    </ImageBackground>
  );
}
