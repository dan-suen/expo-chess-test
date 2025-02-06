import { StyleSheet } from 'react-native';
const boardStyles = StyleSheet.create({
  board: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    overflow: "hidden",
  },
  row: {
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent: "flex-start", 
    flex: 1,
  },
  text: {
    fontFamily :"Arial",
    fontWeight: 900,
    textAlign:"center"
  }
});
export default boardStyles;
