import React, { useState, Fragment } from 'react';
import { X } from 'lucide-react';

// Utility for combining class names
export const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 transform active:scale-[0.98]";
    const variantClasses = {
      primary: 'bg-[--color-terracotta] text-white hover:bg-[#D46A58] focus:ring-[--color-terracotta]',
      secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300',
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-100 focus:ring-gray-300',
      ghost: 'hover:bg-gray-100 focus:ring-gray-300',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };
    
    return <button className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)} ref={ref} {...props} />;
  }
);

// Card Component
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl', className)} {...props} />
  )
);

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

export const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn('font-semibold font-serif leading-none tracking-tight text-xl', className)} {...props} />
);

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn('text-sm text-gray-500', className)} {...props} />
);

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
);

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
);

// Badge Component
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}
export const Badge: React.FC<BadgeProps> = ({ className, variant = 'secondary', ...props }) => {
    const variantClasses = {
        primary: 'bg-orange-100 text-orange-800',
        secondary: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
    };
    return <div className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', variantClasses[variant], className)} {...props} />
};

// Dialog (Modal) Component
interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}
export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" aria-modal="true" role="dialog">
            <div className="relative w-full max-w-lg p-4">
                <Card className="w-full">
                    <div className="flex items-start justify-between p-4 border-b">
                        <h3 className="text-lg font-semibold font-serif">{title}</h3>
                        <Button variant="ghost" size="sm" onClick={onClose} className="-m-2 p-2">
                            <X size={20} />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                    <div className="p-6">{children}</div>
                </Card>
            </div>
        </div>
    );
};

// Input Component
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
        <input className={cn("flex h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[--color-terracotta] focus:ring-offset-2", className)} ref={ref} {...props} />
    )
);

// Textarea Component
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => (
        <textarea className={cn("flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[--color-terracotta] focus:ring-offset-2", className)} ref={ref} {...props} />
    )
);

// Label Component
export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => (
        <label ref={ref} className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props} />
    )
);

// Skeleton Loader
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
    return <div className={cn('animate-pulse rounded-lg bg-gray-200', className)} />;
};