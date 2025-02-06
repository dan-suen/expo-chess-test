import { useSettings } from '@/app/context/SettingsContext';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/app/components/Button';
import settingstyles from '../styles/settings.styles';
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { Button as IconButton, Icon, CheckBox } from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import createPieces from '../components/Pieces';

export default function Settings() {
  const {
    selectedImage,
    setSelectedImage,
    PlaceholderImage,
    lightDark,
    setLightDark,
    playerBlack,
    setPlayerBlack,
    setPieces,
    initialPositions,
    pieces, 
    squareRefs
  } = useSettings();
  const [playerBlackLocal, setPlayerBlackLocal] =
    useState<boolean>(playerBlack);
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
      <View
        style={[
          settingstyles.overlay,
          {
            backgroundColor:
              lightDark === 'Light'
                ? 'rgba(255, 253, 253, 0.5)'
                : 'rgba(0, 0, 0, 0.5)',
          },
        ]}
      />
      <View style={settingstyles.container}>
        <IconButton
          color="blue"
          radius={'sm'}
          type="solid"
          titleStyle={{ color: 'white' }}
          onPress={() => {
            setPieces(initialPositions);
            setPlayerBlack(playerBlackLocal);
            createPieces(pieces, squareRefs);
          }}
        >
          New Game
          <AntDesign
            name="plus"
            color="white"
            style={{
              marginLeft: 3,
            }}
          />
        </IconButton>
        <View
          style={[
            settingstyles.toggle,
            { backgroundColor: playerBlackLocal ? 'black' : 'white' },
          ]}
        >
          <CheckBox
            size={32}
            onPress={() => setPlayerBlackLocal(!playerBlackLocal)}
            checked={playerBlackLocal}
            uncheckedColor="#000000"
            checkedColor="#ffffff"
            checkedIcon="checkbox-active"
            uncheckedIcon="checkbox-passive"
            iconType="fontisto"
            containerStyle={{
              backgroundColor: playerBlackLocal ? '#000000' : '#ffffff',
              marginLeft: -5,
            }}
          ></CheckBox>
          <Text
            style={{
              color: playerBlackLocal ? 'white' : 'black',
              marginRight: 6,
              marginLeft: -7,
            }}
          >
            Play as Black
          </Text>
          <MaterialCommunityIcons
            name="chess-king"
            color={playerBlackLocal ? 'white' : 'black'}
            size={40}
          />
        </View>
        <TouchableOpacity
          style={[
            {
              backgroundColor: lightDark === 'Light' ? 'black' : 'white',
              borderRadius: 3,
            },
          ]}
          onPress={() => setLightDark(lightDark === 'Light' ? 'Dark' : 'Light')}
        >
          <Text style={{ color: lightDark === 'Light' ? 'white' : 'black' }}>
            {lightDark == 'Light' ? 'Dark' : 'Light'} Mode
          </Text>
          <Icon
            name={lightDark === 'Light' ? 'dark-mode' : 'sunny'}
            color={lightDark === 'Light' ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <View style={settingstyles.footerContainer}>
          <Button label="Change Background" onPress={pickImageAsync} />
        </View>
      </View>
    </ImageBackground>
  );
}
