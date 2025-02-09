import axios from 'axios';
const StockfishModule = {
  sendCommand: function (command: string) {
    axios
      .post('https://expo-chess-back.onrender.com/uci', {command})
      .then((response) => {
        console.log('hit hit hit');
        console.log(response['response']);
        return response['response'];
      })
      .catch((error) => {
        console.log(error);
        return '';
      });
  },
};
export default StockfishModule;
