import { useState } from "react";
import { toast } from "react-toastify";
import { Usuario } from "./useFetchUser";
import api from "../../../core/http"; 
export const useChangePassword = (usuario: Usuario | null) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    //const navigate = useNavigate();

    const changePassword = async (novaSenha: string, confirmarSenha: string) => {
        if (novaSenha !== confirmarSenha) {
            toast.error("As senhas não coincidem.", { position: "bottom-right" });
            return;
        }
        if (!usuario) {
            toast.error("Usuário não encontrado.", { position: "bottom-right" });
            return;
        }

        try {
            setIsSubmitting(true);
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Token não encontrado");

            await api.put(`/usuarios/edit/${usuario.id}`, { ...usuario, password: novaSenha }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Senha alterada com sucesso!", { position: "bottom-right" });
        } catch (err) {
            console.log(err)
            toast.error("Erro ao alterar senha.", { position: "bottom-right" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return { changePassword, isSubmitting };
};
