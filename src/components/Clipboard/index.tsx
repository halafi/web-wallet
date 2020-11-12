/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// from desktop-wallet
// import { Tooltip } from 'app/components/Tooltip';
import React from 'react';
import useClipboard from '../../hooks/useClipboard';

type ClipboardProps = {
  data: string | object;
  // tooltip?: string;
  options?: Record<string, any>;
  children: React.ReactNode;
};

const Clipboard = ({ data, options, children }: ClipboardProps) => {
  const [hasCopied, copy] = useClipboard({
    resetAfter: 1000,
    ...options,
  });

  if (!children) {
    return null;
  }

  return (
    <div className="inline-block cursor-pointer" onClick={() => copy(data)}>
      {children}
    </div>
  );
};

Clipboard.defaultProps = {
  // data: '',
  options: {},
};

export default Clipboard;
