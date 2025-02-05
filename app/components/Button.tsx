import {View, Pressable, Text } from 'react-native';
import buttonStyles from '../styles/Button.styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary';
  onPress?: () => void;
};

export default function Button({ label, theme, onPress}: Props) {
    if (theme === 'primary') {
        return (
          <View
            style={[
              buttonStyles.buttonContainer,
              { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
            ]}>
            <Pressable
              style={[buttonStyles.button, { backgroundColor: '#fff' }]}
              onPress={onPress}>
              <FontAwesome name="picture-o" size={18} color="#25292e" style={buttonStyles.buttonIcon} />
              <Text style={[buttonStyles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
            </Pressable>
          </View>
        );
      }
    return (
      <View style={buttonStyles.buttonContainer}>
        <Pressable style={buttonStyles.button} onPress={() => alert('You pressed a button.')}>
          <Text style={buttonStyles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }