import React from 'react';
import { FaArrowLeft, FaCopy, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MnemonicList from './components/MnemonicList';
import Clipboard from '../../../../components/Clipboard';
import Button from '../../../../components/Button';

const WalletCreation = () => {
  const mnemonic = 'bur kek foo bar bargain evil nest walk give crisp photo';
  const address = 'AaLVT9xZ2SgfWWignDjsN8cMqbfTxesbGY';

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

  return (
    <div>
      <nav className="flex mb-4">
        <Link
          to="/wallet"
          className="py-2 px-4 flex items-center bg-gray-800 text-gray-400 hover:text-white"
        >
          <FaArrowLeft /> Back
        </Link>
      </nav>
      Wallet creation
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
    </div>
  );
};

export default WalletCreation;
