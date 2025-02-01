import React from 'react';
import { Link, To } from 'react-router-dom';

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  to?: To;
  type?: 'primary' | 'secondary' | 'small';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Button({ children, disabled, to, type = 'primary', onClick }: ButtonProps) {
  const base =
    'focus: inline-block text-sm rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 outline-none transition-colors duration-300 hover:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles = {
    primary: base + ' px-4 py-3 sm:px-6 sm:py-4',
    small: base + ' py-2 md:px-5 md:py-2.5 px-4 text-xs',
    secondary:
      'focus: inline-block text-sm rounded-full bg-transparent border-2 border-stone-300  font-semibold uppercase tracking-wide text-stone-400 outline-none transition-colors duration-300 hover:bg-stone-300 hover:text-stone-600 focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 sm:px-6 sm:py-4 md:py-3.5',
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
