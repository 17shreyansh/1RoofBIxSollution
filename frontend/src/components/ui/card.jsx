import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

const Card = React.forwardRef(({ className = '', ...props }, ref) => (
  <BootstrapCard ref={ref} className={className} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className = '', ...props }, ref) => (
  <BootstrapCard.Header ref={ref} className={className} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className = '', ...props }, ref) => (
  <BootstrapCard.Title ref={ref} className={className} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className = '', ...props }, ref) => (
  <BootstrapCard.Text ref={ref} className={`text-muted ${className}`} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className = '', ...props }, ref) => (
  <BootstrapCard.Body ref={ref} className={className} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className = '', ...props }, ref) => (
  <BootstrapCard.Footer ref={ref} className={className} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };