import React from 'react';
import classnames from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

// super simple for now
// TODO: re-use in nav link buttons
const Button = ({ children, className, onClick }: Props) => (
  <button
    onClick={onClick}
    type="button"
    className={classnames(
      'py-2 px-4 mt-4 flex items-center hover:text-white text-gray-400 bg-gray-800',
      className,
    )}
  >
    {children}
  </button>
);

Button.defaultProps = {
  className: '',
  onClick: null,
};

export default Button;
