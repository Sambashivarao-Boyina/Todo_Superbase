import React from 'react'

type ButtonPropos ={
    title:string;
    disabled: boolean;
}

const Button: React.FC<ButtonPropos> = ({title,disabled}) => {
    return (
        <button
            className={`w-full h-8 bg-blue-600 text-white rounded-md drop-shadow  font-semibold text-lg ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={disabled}
        >
            {title}
        </button>
    );
}

export default Button
