import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    fontFamily: '-apple-system'
  },
  appContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  appLogo: {
    height: 80, 
    width: 80,
  },
  appLink: {
    color: '#61dafb',
  },
  blank: {
    backgroundColor: 'white',
  },
  brown: {
    backgroundColor: 'brown',
  },
  chessboard: {
    borderWidth: 1,
    borderColor: 'black',
    height: 400,
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSize: {
    width: 50,
    height: 50,
  },
  active: {
    backgroundColor: 'blue',
  },
  nonActive: {
    backgroundColor: 'rgba(0, 255, 0, 0.3)', 
  },
});

export default styles;