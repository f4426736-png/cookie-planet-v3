import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onClick?: () => void;
  href?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  href,
  className = '',
}) => {
  let variantStyles = '';

  if (variant === 'primary') {
    variantStyles = 'bg-[#051A24] text-white btn-primary-shadow hover:opacity-95 active:scale-[0.98]';
  } else if (variant === 'secondary') {
    variantStyles = 'bg-white text-[#051A24] btn-secondary-shadow hover:bg-neutral-50 active:scale-[0.98]';
  } else if (variant === 'tertiary') {
    variantStyles = 'bg-white text-[#051A24] btn-tertiary-shadow hover:bg-neutral-50 active:scale-[0.98]';
  }

  const baseStyles = 'inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 cursor-pointer select-none';

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};
