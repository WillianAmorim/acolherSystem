import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Definição da interface Convenio
export interface Convenio {
  id: number;
  empresa: string;
  cnpj: string;
  valor_convenio: string;
}

const useConvenios = () => {
  const navigate = useNavigate();
  const [convenios, setConvenios] = useState<Convenio[]>([]); // Define explicitamente como Convenio[]
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConvenios = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get("https://sistema.clinicaacolherslz.com.br/api/convenios", { headers });
      setConvenios(response.data.original || []); // Garante que convenios sempre será um array
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error("Sessão expirada. Você será redirecionado para o login.", {
          position: "bottom-right",
        });
        navigate("/login");
      }
      setError("Erro ao carregar convênios.");
    } finally {
      setLoading(false);
    }
  };

  const addConvenio = async (newConvenio: Convenio) => {
    try {
      const token = localStorage.getItem("authToken");
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post("https://sistema.clinicaacolherslz.com.br/api/convenios", newConvenio, { headers });
      toast.success("Convênio cadastrado com sucesso!");
      fetchConvenios(); // Atualiza os convênios após cadastro
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error("Sessão expirada. Você será redirecionado para o login.", {
          position: "bottom-right",
        });
        navigate("/login");
      }
      toast.error("Erro ao cadastrar convênio.");
    }
  };

  useEffect(() => {
    fetchConvenios(); // Carrega os convênios ao montar o componente
  }, []);

  return { convenios, loading, error, addConvenio, fetchConvenios, setConvenios };
};

export default useConvenios;
