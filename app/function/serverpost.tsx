import axios from 'axios';
import { Chess } from 'chess.js';
const StockfishModule = {
  sendCommand: function (
    command: string,
    chess: Chess,
    setText: React.Dispatch<React.SetStateAction<string>>
  ) {
    console.log("Sending move to Stockfish:", command);

    axios
      .post("https://expo-chess-back.onrender.com/uci", { command })
      .then((response) => {
        if (/[0-9]/.test(command)){
          chess.move(command, { sloppy: true })
        }
        console.log("Stockfish response:", response.data);

        const move = response.data?.response; // Ensure response exists
        if (!move) {
          console.log("No move received from Stockfish.");
          return;
        }

        console.log("Current history:", chess.history());
        console.log("Move received:", move);
        console.log("board received:", chess.ascii());
        chess.move(move, { sloppy: true });
        setText(`Bob plays: ${move}`);
      })
      .catch((error) => {
        console.log("Current history on error:", chess.history());
        console.error("Error sending command:", error);
      });
  },
};

export default StockfishModule;
