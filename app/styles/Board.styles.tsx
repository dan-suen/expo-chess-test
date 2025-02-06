import { StyleSheet } from "react-native";
const boardStyles = StyleSheet.create({
  board: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
});
export default boardStyles;