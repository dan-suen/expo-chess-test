import { StyleSheet } from 'react-native';
const boardStyles = StyleSheet.create({
  board: {
    flexDirection: 'column',
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    overflow: "hidden",
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    fontFamily :"Arial",
    fontWeight: 900,
    textAlign:"center"
  }
});
export default boardStyles;
