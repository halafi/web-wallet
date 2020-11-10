import React from 'react';
import classnames from 'classnames';
import { FaExternalLinkAlt } from 'react-icons/fa';
import classes from '../../tailwind';

const Overview = () => (
  <div className="flex flex-col">
    <h1 className="self-center h-32 flex items-center text-xl font-bold">Welcome.</h1>
    <p className="self-center text-center">
      Start by importing a wallet, or import some of&nbsp;
      <a
        href="https://explorer.ark.io/top-wallets/1"
        className={classnames(classes.link, 'inline')}
        target="_blank"
        rel="noreferrer noopener"
      >
        ARK&apos;s top wallets&nbsp;
        <FaExternalLinkAlt className="inline mb-1" />
      </a>
    </p>
    <p className="self-center text-sm text-gray-800 text-center mt-2">
      Note: read-only mode, making transactions won&apos;t work.
    </p>
  </div>
);

export default Overview;
