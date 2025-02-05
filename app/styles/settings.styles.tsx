import { StyleSheet } from 'react-native';

const settingstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

export default settingstyles;