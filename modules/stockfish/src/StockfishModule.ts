import { NativeModule, requireNativeModule } from 'expo';

import { StockfishModuleEvents } from './Stockfish.types';

declare class StockfishModule extends NativeModule<StockfishModuleEvents> {
  getStockfishOutput(): Promise<string>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<StockfishModule>('Stockfish');
