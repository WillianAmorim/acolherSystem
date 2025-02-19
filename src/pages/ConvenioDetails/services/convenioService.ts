import axios from "axios";

const API_URL = "https://sistema.clinicamultihabilit.com.br/api";

// Obtém o token de autenticação armazenado
const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("Token de autenticação não encontrado. Faça login novamente.");
    }
    return { Authorization: `Bearer ${token}` };
};

// Serviço para convênios
const convenioService = {
    /**
     * Busca os procedimentos da API
     */
    getProcedimentos: async () => {
        try {
            const { data } = await axios.get(`${API_URL}/procedimentos`, {
                headers: getAuthHeaders(),
            });
            return data;
        } catch (error) {
            console.error("Erro ao buscar procedimentos:", error);
            throw error;
        }
    },

    /**
     * Adiciona um novo procedimento
     * @param procedimentoData Dados do procedimento a ser cadastrado
     */
    addProcedimento: async (procedimentoData: {
        codigo: string;
        nome: string;
        valor_ch: number;
        porte_anestesia: number;
        ch_anestesista: number;
        custo_operacional: number;
        num_auxiliares: number;
        tempo: number;
        valor_filme: number;
        codigo_tuss: string;
        convenio_id: number;
    }) => {
        try {
            const { data } = await axios.post(`${API_URL}/procedimentos`, procedimentoData, {
                headers: getAuthHeaders(),
            });
            return data;
        } catch (error) {
            console.error("Erro ao adicionar procedimento:", error);
            throw error;
        }
    },

    /**
     * Associa um procedimento a um convênio
     * @param convenioProcedimento Dados para associar um procedimento a um convênio
     */
    addConvenioProcedimento: async (convenioProcedimento: {
        convenio_id: number;
        procedimento_id: number;
        preco: string | number;
    }) => {
        try {
            const { data } = await axios.post(
                `${API_URL}/convenio-procedimentos`,
                convenioProcedimento,
                {
                    headers: getAuthHeaders(),
                }
            );
            return data;
        } catch (error) {
            console.error("Erro ao associar procedimento ao convênio:", error);
            throw error;
        }
    },
};

export default convenioService;
