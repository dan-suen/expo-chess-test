import * as React from 'react';

import { StockfishViewProps } from './Stockfish.types';

export default function StockfishView(props: StockfishViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
