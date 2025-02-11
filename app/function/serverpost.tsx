import axios from 'axios';
import { Chess } from 'chess.js';
const StockfishModule = {
  sendCommand: function (
    command: string,
    chess: Chess,
    setText: React.Dispatch<React.SetStateAction<string>>,
  ) {
    console.log('Sending move to Stockfish:', command);
    if (/[0-9]/.test(command)) {
      // console.log("hitting chess")
      // console.log(chess.moves())
      chess.move({ from: command.substring(0,2), to: command.substring(2,4), promotion: command[4] })
      setText("Bob is thinking...")
    }
    axios
      //.post('http://localhost:5000/uci', { command })
      .post("https://expo-chess-back.onrender.com/uci", { command })
      .then((response) => {
        console.log('Stockfish response:', response.data);

        const move = response.data?.response; // Ensure response exists
        if (!move) {
          console.log('No move received from Stockfish.');
          return;
        }
        console.log('Current history:', chess.history());
        console.log('Move received:', move);
        console.log('board received:', chess.ascii());
        console.log('Avaliable Moves: ', chess.moves());
        if (/[0-9]/.test(move)) {
          chess.move( {from: move.substring(0,2), to: move.substring(2,4), promotion: move[4] });
          let message = `Bob plays: ${move}`;
          if (!chess.isGameOver()) {
            message += `${
              chess.inCheck()
                ? `\nCheck! Your options are ${chess.moves()}`
                : ''
            }`;
            // chess.moves().forEach((item) => {
            //   if (item.length === 2) {
            //     message += `Pawn ${item}`;
            //   } else if (item[0] === 'N') {
            //     message += `Knight ${item.substring(1)}`;
            //   } else if (item[0] === 'Q') {
            //     message += `Queen ${item.substring(1)}`;
            //   } else if (item[0] === 'N') {
            //     message += `Knight ${item.substring(1)}`;
            //   } else if (item[0] === 'N') {
            //     message += `Knight ${item.substring(1)}`;
            //   } else if (item[0] === 'N') {
            //     message += `Knight ${item.substring(1)}`;
            //   }
            // });
          }
          if (chess.isGameOver()) {
            message += `${chess.isGameOver() ? "\nThat's game, bruv!" : ''}`;
            message += ' You lost by: ';
            // console.log(chess.isStalemate());
            // console.log(chess.isThreefoldRepetition());
            // console.log(chess.isInsufficientMaterial());
            // console.log(chess.isDrawByFiftyMoves());
            // console.log(chess.isDraw());
            // console.log(chess.isCheckmate());
            if (chess.isCheckmate()) {
              message +=
                "Checkmate. Yeah, that's right, You lost in such a normal way.";
            } else if (chess.isStalemate()) {
              message +=
                "Stalement. Yeah, that's right, I'm not the loser, you are.";
            } else if (chess.isThreefoldRepetition()) {
              message +=
                "Threefold Repetition. Yeah, that's right, You can't outthink this one.";
            } else if (chess.isInsufficientMaterial()) {
              message +=
                "Insufficient Material. Yeah, that's right, You don't have what it takes.";
            } else if (chess.isDrawByFiftyMoves()) {
              message +=
                "Draw by Fifty Moves. Yeah, that's right, You're just too slow.";
            } else if (chess.isDraw()) {
              message += "Draw. Yeah, that's right, Git Gud.";
            }
            this.sendCommand('End', chess, setText);
          }
          setText(message);
        }
      })
      .catch((error) => {
        console.log('Current history on error:', chess.history());
        console.error('Error sending command:', error);
        setText(`Bob is having a bad day: Can't Connect To Server`)
      });
  },
};

export default StockfishModule;
