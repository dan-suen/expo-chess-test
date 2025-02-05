import { StyleSheet } from "react-native";
const boardStyles = StyleSheet.create({
    board: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: 320, // 8 cells x 40px each for example
      height: 320, // 8 cells x 40px each
      borderWidth: 1,
    },
    cell: {
      width: '12.5%', // 8 cells per row, so each cell takes up 12.5% of the width
      height: '12.5%', // Same for height
      justifyContent: 'center',
      alignItems: 'center',
    },
    lightCell: {
      backgroundColor: '#f0d9b5', // Light color for white cells
    },
    darkCell: {
      backgroundColor: '#b58863', // Dark color for black cells
    },
    pieceText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });
export default boardStyles;