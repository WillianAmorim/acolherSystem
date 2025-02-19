import React, { useState } from "react";
import { useChangePassword } from "../hooks/useChangePassword";
import { Usuario } from "../hooks/useFetchUser";

interface ChangePasswordFormProps {
    usuario: Usuario;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ usuario }) => {
    const { changePassword, isSubmitting } = useChangePassword(usuario);
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        changePassword(novaSenha, confirmarSenha);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Alterar Senha</h4>
            <div className="flex gap-5 mb-4 w-full">
                <input
                    type="password"
                    placeholder="Nova Senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-1/2"
                    required
                />
                <input
                    type="password"
                    placeholder="Confirmar Senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-1/2"
                    required
                />
            </div>
            <button type="submit" disabled={isSubmitting} className={`w-auto p-2 text-white text-sm rounded-md ${isSubmitting ? "bg-gray-300 cursor-not-allowed" : "bg-[#084E6F] hover:bg-[#54719C]"}`}>
                {isSubmitting ? "Alterando..." : "Alterar Senha"}
            </button>
        </form>
    );
};

export default ChangePasswordForm;
