import React, { useReducer, useEffect, Reducer } from 'react';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import type { RouteProps } from 'react-router-dom';
import { FaWallet, FaAddressBook, FaNewspaper, FaPuzzlePiece } from 'react-icons/fa';

import './layout.css';

type Props = RouteProps & {
  children: React.ReactNode;
};

const Layout = ({ children, location }: Props) => {
  const pathname = location?.pathname;
  return (
    <div className="my-4 mx-4 sm:mx-16 sm:my-8 rounded-lg w-full max-w-screen-xl bg-black flex">
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
      <main id="main" className="grid grid-cols-4 gap-2 w-full">
        <div className="col-span-3 p-4 rounded bg-gradient-to-r from-gray-200 to-gray-600 overflow-y-auto custom-h">
          {children}
        </div>
        <aside id="sidebar" className="p-4 rounded bg-gray-600 custom-h">
          <button type="button">Create Wallet</button>
          <button type="button">Import Wallet</button>
        </aside>
      </main>
    </div>
  );
};

// FIXME: types
export default withRouter<any, any>(Layout);
