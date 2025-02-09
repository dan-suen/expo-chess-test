import { View, Pressable, Text } from 'react-native';
import buttonStyles from '../styles/Button.styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  onPress?: () => void;
  name:string;
  size:number;
};

export default function Button({ label, onPress, name, size }: Props) {
  return (
    <View
      style={[
        buttonStyles.buttonContainer,
        { borderWidth: 4, borderColor: '#ffd33d', borderRadius: 18 },
      ]}
    >
      <Pressable
        style={[buttonStyles.button, { backgroundColor: '#fff' }]}
        onPress={onPress}
      >
        <FontAwesome
          name={name}
          size={size}
          color="#25292e"
          style={buttonStyles.buttonIcon}
        />
        <Text style={[buttonStyles.buttonLabel, { color: '#25292e' }]}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}
