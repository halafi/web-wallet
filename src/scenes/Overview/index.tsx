import React from 'react';
import classnames from 'classnames';
import { FaExternalLinkAlt } from 'react-icons/fa';
import classes from '../../tailwind';

const Overview = () => (
  <div className="flex flex-col">
    <p className="self-center h-32 flex items-center">Welcome.</p>
    <p className="self-center flex items-center">
      Start by importing a wallet, or import some of&nbsp;
      <a
        href="https://explorer.ark.io/top-wallets/1"
        className={classnames(classes.link, 'flex items-center')}
        target="_blank"
        rel="noreferrer noopener"
      >
        ARK&apos;s top wallets&nbsp;
        <FaExternalLinkAlt />
      </a>
    </p>
    <p className="self-center text-sm text-gray-800">
      Note: read-only mode, making transactions won&apos;t work.
    </p>
  </div>
);

export default Overview;
