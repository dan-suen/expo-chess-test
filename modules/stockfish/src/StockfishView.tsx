import { requireNativeView } from 'expo';
import * as React from 'react';

import { StockfishViewProps } from './Stockfish.types';

const NativeView: React.ComponentType<StockfishViewProps> =
  requireNativeView('Stockfish');

export default function StockfishView(props: StockfishViewProps) {
  return <NativeView {...props} />;
}
