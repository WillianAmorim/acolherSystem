import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Procedimento = {
    id: number;
    nome: string;
};

type ProcedimentoOption = {
    value: number;
    label: string;
};

const useProcedimentos = () => {
    const [procedimentos, setProcedimentos] = useState<ProcedimentoOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProcedimentos = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const { data } = await axios.get("https://sistema.clinicamultihabilit.com.br/api/procedimentos", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const options = data.map((procedimento: Procedimento) => ({
                    value: procedimento.id,
                    label: procedimento.nome,
                }));
                setProcedimentos(options);
            } catch (err) {
                console.error("Erro ao buscar procedimentos:", err);
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    toast.error("Sessão expirada. Você será redirecionado para o login.", {
                        position: "top-right",
                    });
                    navigate("/login");
                } else {
                    setError("Erro ao carregar procedimentos.");
                    toast.error("Erro ao carregar procedimentos.", {
                        position: "top-right",
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProcedimentos();
    }, [navigate]);

    return { procedimentos, loading, error };
};

export default useProcedimentos;
