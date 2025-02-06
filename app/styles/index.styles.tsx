import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    fontFamily: '-apple-system',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

});

export default styles;