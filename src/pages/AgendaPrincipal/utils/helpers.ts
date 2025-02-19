import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
/**
 * Lista de horários de marcação.
 */
interface Agendamento {
    data_agendada: string;
    [key: string]: any; // Adicione outras propriedades conforme necessário
}

export const horariosMarcacao: { hora: string; agendamentos: Agendamento[] }[] = [
    { hora: "08:00:00", agendamentos: [] },
    { hora: "08:50:00", agendamentos: [] },
    { hora: "09:40:00", agendamentos: [] },
    { hora: "10:30:00", agendamentos: [] },
    { hora: "11:20:00", agendamentos: [] },
    { hora: "12:10:00", agendamentos: [] },
    { hora: "13:00:00", agendamentos: [] },
    { hora: "13:50:00", agendamentos: [] },
    { hora: "14:40:00", agendamentos: [] },
    { hora: "15:30:00", agendamentos: [] },
    { hora: "16:20:00", agendamentos: [] },
    { hora: "17:10:00", agendamentos: [] },
    { hora: "18:00:00", agendamentos: [] },
];

/**
 * Confirma um agendamento.
 */
export const handleConfirmAppointment = async (row: any, navigate: ReturnType<typeof useNavigate>) => {
    const statusTrue = {
        atendente: row.atendente?.id,
        paciente: row.paciente?.id_usuario,
        medico_id: row.medico?.id,
        data_agendada: row.data_agendada,
        status: 1,
        convenio: row.convenio.id,
        numero_guia: row.numero_guia,
    };

    //console.log(statusTrue)
    // const navigate = useNavigate();


    try {
        const token = localStorage.getItem("authToken");
        await axios.put(
            `https://sistema.clinicamultihabilit.com.br/api/agendamentos/${row.id}`,
            statusTrue,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        toast.success("Agendamento confirmado com sucesso!", {
            position: "bottom-right",
        });
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
            toast.error('Sessão expirada. Você será redirecionado para o login.', {
                position: 'bottom-right',
            });
            navigate('/login');
        }
        console.error("Erro ao confirmar agendamento:", err);
        toast.error("Erro ao confirmar agendamento.", { position: "bottom-right" });
    }
};


export const obterDataAtual = () => {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, "0");
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
    const ano = dataAtual.getFullYear();

    return { data: dataAtual, dataFormatada: `${ano}-${mes}-${dia}` };
};

/**
 * Filtra os agendamentos para preencher os horários de marcação.
 */
export const filtrarAgendamentos = (dataFormatada: string, agendamentos: any[] = []) => {
    // Limpa os agendamentos anteriores
    horariosMarcacao.forEach((horarioAgendamento) => {
        horarioAgendamento.agendamentos = [];
    });

    console.log(agendamentos, 'agendamentos')


    // Garante que agendamentos seja um array válido
    if (!Array.isArray(agendamentos) || agendamentos.length === 0) {
        console.warn("Nenhum agendamento encontrado para a data:", dataFormatada);
        return horariosMarcacao;
    }


    // Filtra os agendamentos e os associa aos horários
    agendamentos.forEach((agendamento) => {
        const [data, hora] = agendamento.data_agendada.split(" ");
        horariosMarcacao.forEach((horario) => {
            if (horario.hora === hora && data === dataFormatada) {
                horario.agendamentos.push(agendamento);
            }
        });
    });

    return horariosMarcacao;
};

/**
 * Cancela um agendamento.
 */
export const handleCancelAppointment = async (row: any, navigate: ReturnType<typeof useNavigate>) => {
    console.log(row)
    try {
        const token = localStorage.getItem("authToken");
        await axios.delete(`https://sistema.clinicamultihabilit.com.br/api/agendamentos/${row.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const mensagem =
            row.status === 0
                ? "Agendamento cancelado com sucesso!"
                : "Consulta cancelada com sucesso!";
        toast.error(mensagem, { position: "bottom-right" });
    } catch (err) {
        // const navigate = useNavigate();
        if (axios.isAxiosError(err) && err.response?.status === 401) {
            toast.error('Sessão expirada. Você será redirecionado para o login.', {
                position: 'bottom-right',
            });
            navigate('/login');
        }
        toast.error("Erro ao cancelar agendamento.", { position: "bottom-right" });
        console.error(err);
    }
};
