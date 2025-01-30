import React, { ButtonHTMLAttributes } from 'react';
import { Link, To } from 'react-router-dom';

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  to: To;
} & ButtonHTMLAttributes<HTMLButtonElement>; // Atribúty natívneho HTML buttonu;

function Button({ children, disabled, to }: ButtonProps) {
  const className =
    'focus: inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 outline-none transition-colors duration-300 hover:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4';

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}

export default Button;
