import api from "../../../core/http"; 

export const getPacientes = async () => {
    const { data } = await api.get("/pacientes");
    return data.original || [];
};

export const getMedicos = async () => {
    const { data } = await api.get("/medicos");
    return data.original || [];
};

export const getMedicosPorId = async (id: number) => {
    const { data } = await api.get(`/medicos/${id}`);
    return data;
};

export const getUsuarioLogado = async () => {
    const { data } = await api.get("/me");
    return data;
};

export const getConvenios = async () => {
    const { data } = await api.get("/convenios");
    return data;
};

export const getHorarios = async () => {
    const { data } = await api.get("/horarios");
    return data;
};

export const getProcedimentoPorConvenio = async (id: number) => {
    const { data } = await api.get(`/convenios/${id}/procedimentos`);
    return data;
};


export const getHorariosPorDiaEMedico = async (diaSemana: any, medicoId: any) => {
    const url = `/horarios/medico/dia/${diaSemana}/${medicoId}`;
    console.log("🌍 Chamando API:", url); // ✅ Log da URL

    try {
        const { data } = await api.get(url); // ✅ Agora segue o mesmo padrão
        return data.data || [];
    } catch (error) {
        console.error("❌ Erro ao buscar horários do médico:", error);
        return [];
    }
};

export const postAgendamento = async (dadosAgendamento: any) => {
    console.log(dadosAgendamento)
    await api.post("/agendamentos", dadosAgendamento);
};
