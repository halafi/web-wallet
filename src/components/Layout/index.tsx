import React, { useState } from 'react';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import { FaWallet, FaAddressBook, FaNewspaper, FaPuzzlePiece } from 'react-icons/fa';
import WalletSidebar from './WalletSidebar';

import './layout.css';

type Props = RouteProps & {
  children: React.ReactNode;
};

const { localStorage } = window;

const Layout = ({ children, location }: Props) => {
  const pathname = location?.pathname;
  const walletsFromLocalStorage = localStorage.getItem('wallets');

  const [wallets, setWallets] = useState<string[]>(
    // TODO: implement wallet validation
    walletsFromLocalStorage ? walletsFromLocalStorage?.split(',') : [],
  );

  const childrenWithProps = React.Children.map(children, (child) => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { wallets, setWallets });
    }
    return child;
  });

  return (
    <div className="my-2 mx-2 xs:my-4 xs:mx-4 sm:my-5 sm:mx-5 md:mx-16 md:my-8 rounded-lg w-full max-w-screen-xl bg-black flex">
      <div id="menu" className="w-22 bg-black pr-2">
        <Link to="/">
          <img src="./logo192.webp" alt="ark logo" className="w-20 h-20 cursor-pointer" />
        </Link>
        <nav className="text-white bg-gray-700 mt-2 rounded overflow-hidden">
          <Link
            to="/wallet"
            className={classnames(
              'p-4 flex justify-center items-center cursor-pointer hover:bg-gray-600',
              {
                'border-left-custom': pathname === '/wallet',
              },
            )}
          >
            <FaWallet
              size={30}
              // className={
              //   pathname === '/' ? 'border-solid border-4 cursor-pointer border-gray-600' : ''
              // }
            />
          </Link>
          <div className="p-4 flex justify-center items-center cursor-not-allowed hover:bg-gray-800">
            <FaAddressBook size={30} />
          </div>
          <div className="p-4 flex justify-center items-center cursor-not-allowed hover:bg-gray-800">
            <FaNewspaper size={30} />
          </div>
          <div className="p-4 flex justify-center items-center cursor-not-allowed hover:bg-gray-800">
            <FaPuzzlePiece size={30} />
          </div>
        </nav>
      </div>
      <main
        id="main"
        className="grid sm:grid-cols-4 sm:grid-rows-none gap-2 w-full custom-grid-rows"
      >
        <div className="row-start-2 row-end-3 sm:row-start-1 sm:row-end-2 col-span-4 sm:col-span-3 p-4 rounded bg-gradient-to-r from-gray-200 to-gray-600 overflow-y-auto custom-h">
          {childrenWithProps}
        </div>
        <div className="row-start-1 row-end-2 sm:row-start-1 sm:row-end-2 col-span-4 sm:col-span-1">
          <WalletSidebar wallets={wallets} setWallets={setWallets} />
        </div>
      </main>
    </div>
  );
};

// FIXME: types
export default withRouter<any, any>(Layout);
