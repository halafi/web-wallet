// from desktop-wallet
import React from 'react';

type Props = {
  mnemonic: string;
};

const MnemonicList = ({ mnemonic }: Props) => (
  <ul className="grid grid-cols-2 row-gap-5 col-gap-3 md:grid-cols-3 lg:grid-cols-4 mt-4">
    {mnemonic.split(' ').map((word, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={i} className="relative px-3 py-3 border border-black rounded">
        <span className="absolute top-0 left-0 px-1 text-xs font-semibold transform translate-x-2 -translate-y-2 bg-gray-400">
          {i + 1}
        </span>
        <span className="font-medium">{word}</span>
      </li>
    ))}
  </ul>
);

export default MnemonicList;
