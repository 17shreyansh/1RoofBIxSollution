import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = React.forwardRef(({ variant = 'primary', size, asChild = false, children, ...props }, ref) => {
  const variantMap = {
    default: 'primary',
    destructive: 'danger',
    outline: 'outline-primary',
    secondary: 'secondary',
    ghost: 'light',
    link: 'link'
  };
  
  if (asChild) {
    return <span ref={ref} {...props}>{children}</span>;
  }
  
  return (
    <BootstrapButton
      ref={ref}
      variant={variantMap[variant] || variant}
      size={size}
      {...props}
    >
      {children}
    </BootstrapButton>
  );
});

Button.displayName = "Button";

export { Button };