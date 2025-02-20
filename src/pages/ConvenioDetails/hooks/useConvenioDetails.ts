import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const useConvenioDetails = (convenioId: number | undefined) => {
    const [convenioDetails, setConvenioDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConvenioDetails = async () => {
            if (!convenioId) return;

            try {
                const token = localStorage.getItem("authToken");
                const { data } = await axios.get(
                    `https://sistema.clinicaacolherslz.com.br/api/convenios/${convenioId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setConvenioDetails(data);
            } catch (err) {
                console.error("Erro ao buscar detalhes do convênio:", err);
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    toast.error("Sessão expirada. Você será redirecionado para o login.", {
                        position: "top-right",
                    });
                    navigate("/login");
                } else {
                    setError("Erro ao carregar detalhes do convênio.");
                    toast.error("Erro ao carregar detalhes do convênio.", {
                        position: "top-right",
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchConvenioDetails();
    }, [convenioId, navigate]);

    return { convenioDetails, loading, error };
};

export default useConvenioDetails;
