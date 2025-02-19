import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    getPacientes,
    getMedicos,
    getUsuarioLogado,
    getConvenios,
    postAgendamento
} from "../services/agendamentoService";

// Definição do tipo correto
type OptionType = { value: number; label: string } | null;

export const useAgendamento = () => {
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [convenios, setConvenios] = useState([]);
    const [userLogin, setUserLogin] = useState<{ id: string } | null>(null);
    const [numeroGuia, setNumeroGuia] = useState("");
    const [selectedPaciente, setSelectedPaciente] = useState<OptionType>(null);
    const [selectedMedico, setSelectedMedico] = useState<OptionType>(null);
    const [selectedConvenio, setSelectedConvenio] = useState<OptionType>(null);
    const [selectedProcedimento, setSelectedProcedimento] = useState<OptionType>(null);
    const [medicoHorarios, setMedicoHorarios] = useState<any[]>([]);
    const [horariosPorData, setHorariosPorData] = useState<any[]>([]);
    const [diaSelecionado, setDiaSelecionado] = useState('');
    const [horaSelecionada, setHoraSelecionada] = useState('');
    const [procedimentosFiltrados, setProcedimentosFiltrados] = useState<any[]>([]);
    const [optionTipoAgendamento, setOptionTipoAgendamento] = useState('');
    const [selectedUnidade, setSelectedUnidade] = useState('');
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const alreadyFetched = useRef(false);

    const fetchData = async () => {
        try {
            const [pacientesData, medicosData, userLoggedIn, conveniosData] = await Promise.all([
                getPacientes(),
                getMedicos(),
                getUsuarioLogado(),
                getConvenios()
            ]);

            setPacientes(pacientesData);
            setMedicos(medicosData);
            setUserLogin(userLoggedIn);
            setConvenios(conveniosData);
        } catch (err) {
            toast.error("Erro ao carregar dados.", { position: "bottom-right" });
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (alreadyFetched.current) return;
        alreadyFetched.current = true;
        fetchData();
    }, []);

    const handleSubmit = async () => {
        if (!selectedPaciente || !selectedMedico || !selectedConvenio || !selectedProcedimento) {
            toast.error("Preencha todos os campos obrigatórios.", { position: "bottom-right" });
            return;
        }

        const dadosAgendamento = {
            atendente: userLogin?.id,
            paciente: selectedPaciente.value,
            medico_id: selectedMedico.value,
            procedimento: selectedProcedimento.value,
            data_agendada: `${diaSelecionado} ${horaSelecionada}`,
            status: 0,
            convenio: selectedConvenio?.value,
            numero_guia: numeroGuia,
            tipo_agendamento: optionTipoAgendamento,
            unidade: selectedUnidade
        };

        try {
            await postAgendamento(dadosAgendamento);
            toast.success("Agendamento realizado com sucesso!", { position: "bottom-right" });
            resetForm();
        } catch (err) {
            toast.error("Erro ao realizar agendamento.", { position: "bottom-right" });
        }
    };

    const resetForm = () => {
        setSelectedPaciente(null);
        setSelectedMedico(null);
        setSelectedConvenio(null);
        setSelectedProcedimento(null);
        setDiaSelecionado('');
        setHoraSelecionada('');
        setNumeroGuia('');
        setOptionTipoAgendamento('');
        setSelectedUnidade('');
    };

    return {
        pacientes,
        medicos,
        convenios,
        selectedPaciente,
        setSelectedPaciente,
        selectedMedico,
        setSelectedMedico,
        selectedConvenio,
        setSelectedConvenio,
        selectedProcedimento,
        setSelectedProcedimento,
        procedimentosFiltrados,
        setProcedimentosFiltrados,
        diaSelecionado,
        setDiaSelecionado,
        horaSelecionada,
        setHoraSelecionada,
        numeroGuia,
        setNumeroGuia,
        optionTipoAgendamento,
        setOptionTipoAgendamento,
        selectedUnidade,
        setSelectedUnidade,
        handleSubmit,
        loading,
        medicoHorarios,
        setMedicoHorarios,
        horariosPorData,
        setHorariosPorData
    };
};
