// Reexport the native module. On web, it will be resolved to StockfishModule.web.ts
// and on native platforms to StockfishModule.ts
export { default } from './src/StockfishModule';
export { default as StockfishView } from './src/StockfishView';
export * from  './src/Stockfish.types';
