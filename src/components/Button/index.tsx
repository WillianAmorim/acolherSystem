import React, { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode; // Tipagem para o conteúdo dentro do botão
    onClick?: () => void; // Tipagem para o evento de clique (opcional)
    type?: "submit" | "reset" | "button"; // Tipos de botão
    variant?: "primary" | "secondary" | "danger"; // Adicione suporte para variantes
}


const Button: React.FC<ButtonProps> = ({ children, onClick, type, variant = "primary" }) => {
    const variantClasses = {
        primary: "bg-[#094D6D] hover:bg-[#54719C] text-white",
        secondary: "bg-gray-500 hover:bg-gray-600 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
    };

    return (
        <button
            type={type}
            className={`p-2 rounded-md text-sm mt-5 ${variantClasses[variant]}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
