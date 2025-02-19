import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../../core/http"; 

export interface Usuario {
    id: number;
    nome_completo: string;
    email: string;
    data_nascimento: string;
    sexo: string;
    rg: string;
    cpf: string;
    nome_social: string | null;
    telefone: string;
    celular: string;
    unidade: string | null;
    role: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export const useFetchUser = () => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get<Usuario>("/me");
                setUsuario(response.data);
            } catch (err) {
                console.log(err)
                toast.error("Erro ao carregar usuário.", { position: "bottom-right"});
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    return { usuario };
};
