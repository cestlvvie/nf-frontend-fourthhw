import React from 'react';

interface ButtonProps {
    variant?: 'solid' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'solid', size = 'md', onClick, children }) => {
    return (
        <button
            className={`rounded ${
                variant === 'solid' ? 'text-white bg-[#daa898]' : 'text-white bg-[#333] border'
            } ${
                size === 'sm' ? 'px-2 py-1 text-sm' : size === 'lg' ? 'px-4 py-2 text-lg' : 'px-3 py-2 text-base'
            } hover:bg-white hover:text-[#333] transition-colors duration-300`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
