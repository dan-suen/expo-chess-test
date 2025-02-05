import { StyleSheet } from 'react-native';

const settingstyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        color: '#fff',
      },
      footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
      },
      backgroundImage: {
        width: '100%',
        height: '100%',
        borderRadius: 18,
      },
      overlay: {
        ...StyleSheet.absoluteFillObject, // Makes it cover the entire ImageBackground
      },
});

export default settingstyles;