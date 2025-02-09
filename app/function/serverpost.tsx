import axios from 'axios';
import { Chess } from 'chess.js';
const StockfishModule = {
  sendCommand: function (command: string, chess:Chess) {
    console.log(command)
    axios
      .post('https://expo-chess-back.onrender.com/uci', {command})
      .then((response) => {
        if (response.data.response.length === 4){
          chess.move(response.data.response, { sloppy: true })
          console.log(response.data.response)
          setPieces(chess.board());
        } else {
          console.log("Not move: ", response.data.response)
        }
        return response.data.response;
      })
      .catch((error) => {
        console.log("this is an error: ha  " + error);
        return '';
      });
  },
};
export default StockfishModule;
