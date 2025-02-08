import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './Stockfish.types';

type StockfishModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class StockfishModule extends NativeModule<StockfishModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(StockfishModule);
