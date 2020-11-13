import React, { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { FaArrowLeft, FaBolt, FaCopy, FaDownload, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Identities } from '@arkecosystem/crypto';
import MnemonicList from './components/MnemonicList';
import Clipboard from '../../../../components/Clipboard';
import Button from '../../../../components/Button';

const generateAddress = () => {
  const mnemonic = generateMnemonic();
  const address = Identities.Address.fromPassphrase(mnemonic);
  return { address, mnemonic };
};

const WalletCreation = () => {
  const [address, setAddress] = useState('');
  const [mnemonic, setMnemonic] = useState('');

  const handleDownload = () => {
    const element = document.createElement('a');
    const data = new Blob([mnemonic], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(data);
    element.download = `${address}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleGeneration = () => {
    const { address: newAddress, mnemonic: newMnemonic } = generateAddress();
    // TODO: setState like this leads to extra re-render
    setAddress(newAddress);
    setMnemonic(newMnemonic);
  };

  // Followup: verification that user copied passphrase

  return (
    <div>
      <nav className="flex mb-4">
        <Link
          to="/wallet"
          className="py-2 px-4 mt-4 flex items-center bg-gray-800 text-gray-400 hover:text-white"
        >
          <FaArrowLeft /> Back
        </Link>
        <Button onClick={handleGeneration}>
          <FaBolt />
          Generate{address && ' another'}
        </Button>
      </nav>
      {!address
        ? 'Click generate to create new wallet.'
        : 'Important: backup your 12-word passphrase:'}
      {address && (
        <>
          <MnemonicList mnemonic={mnemonic} />
          <div className="flex justify-end">
            <Clipboard data={mnemonic}>
              <Button>
                <FaCopy />
                &nbsp;Copy
              </Button>
            </Clipboard>
            <Button className="ml-2" onClick={handleDownload}>
              <FaDownload />
              &nbsp;Download
            </Button>
          </div>
          <div className="mt-4">
            <span className="mr-2">Your new address: {address}</span>
            <Clipboard data={address}>
              <button
                type="button"
                className="mt-3 border-2 bg-gray-700 border-gray-700 rounded-3xl p-1 text-gray-300 hover:text-gray-500 mr-1"
              >
                <FaCopy />
              </button>
            </Clipboard>
            <button
              type="button"
              onClick={() => alert('TODO: refactor global state and make this import wallet')}
              className="mt-3 border-2 bg-gray-700 border-gray-700 rounded-3xl p-1 text-gray-300 hover:text-gray-500"
            >
              <FaPlus />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WalletCreation;
