import * as React from 'react';
import { render } from 'react-dom';
import Wallet from './scenes/Wallet';

const container = document.getElementById('container');

if (container) {
  render(
    <React.StrictMode>
      <Wallet />
    </React.StrictMode>,
    container,
  );
}
