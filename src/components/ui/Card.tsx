import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  delay?: number;
}

export const Card = ({ children, className = '', hoverable = false, padding = 'md', delay = 0 }: CardProps) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-10',
  };

  return (
    <div 
      className={`
        bg-surface border border-outline rounded-xl overflow-hidden
        ${hoverable ? 'transition-all duration-200 hover:border-emerald-500/30 hover:-translate-y-0.5' : ''}
        ${paddings[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`mb-6 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`text-2xl font-bold text-on-surface tracking-tight ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <p className={`text-sm text-on-surface-variant ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={className}>{children}</div>
);

export const CardFooter = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`mt-6 pt-6 border-t border-outline-variant ${className}`}>{children}</div>
);
