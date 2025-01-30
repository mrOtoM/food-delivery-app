import React from 'react';
import { Link, To, useNavigate } from 'react-router-dom';

type LinkButtonProps = {
  children: React.ReactNode;
  to: To;
};

function LinkButton({ children, to }: LinkButtonProps) {
  const navigate = useNavigate();
  const className = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';

  if (to === '-1') {
    return (
      <button className={className} onClick={() => navigate(-1)}>
        &larr; Spat
      </button>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
