import Select from "react-select";
import { getMedicosPorId, getHorariosPorDiaEMedico } from "../services/agendamentoService";

interface Medico {
    id: number;
    usuario: {
        nome_completo: string;
    };
}

interface SelectMedicoProps {
    medicos: Medico[];
    selectedMedico: { value: number; label: string } | null;
    setSelectedMedico: (medico: { value: number; label: string } | null) => void;
    setMedicoHorarios: (horarios: any[]) => void;
    setHorariosPorData: (horarios: any[]) => void;
    diaSemana: string;
    diaSelecionado: string;
}

const SelectMedico = ({ 
    medicos, 
    selectedMedico, 
    setSelectedMedico, 
    setMedicoHorarios, 
    setHorariosPorData, 
    diaSemana,
    diaSelecionado
}: SelectMedicoProps) => {
    
    const handleMedicoChange = async (selectedOption: { value: number; label: string } | null) => {
        setSelectedMedico(selectedOption);
        
        if (!selectedOption || !diaSelecionado) {
            setMedicoHorarios([]);
            setHorariosPorData([]);
            return;
        }
        
        try {
            const medicoData = await getMedicosPorId(selectedOption.value);
            const agendamentos = medicoData?.original?.agendamentos || [];
            const horariosDisponiveis = await getHorariosPorDiaEMedico(diaSemana, selectedOption.value);
    
            const agendamentosRecorrentes = agendamentos.filter((a: any) => a.recorrencia);
    
            const datasBloqueadas = new Set();
            agendamentosRecorrentes.forEach((agendamento: any) => {
                const data = new Date(agendamento.data_agendada);
                while (data < new Date(diaSelecionado)) {
                    data.setDate(data.getDate() + 7);
                    datasBloqueadas.add(`${data.toISOString().split("T")[0]} ${agendamento.data_agendada.split(" ")[1]}`);
                }
            });
    
            const horariosFiltrados = horariosDisponiveis.filter((horario: any) => {
                const dataHoraAgendada = agendamentos.some((agendamento: any) => 
                    agendamento.data_agendada === `${diaSelecionado} ${horario.horario}`
                );
    
                const dataBloqueada = datasBloqueadas.has(`${diaSelecionado} ${horario.horario}`);
    
                return !dataHoraAgendada && !dataBloqueada;
            });

            setMedicoHorarios(horariosFiltrados);
            setHorariosPorData(horariosFiltrados);
            
        } catch (error) {
            console.error("Erro ao buscar horários do médico:", error);
            setMedicoHorarios([]);
            setHorariosPorData([]);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Terapeuta</label>
            <Select
                placeholder="Selecione um médico"
                value={selectedMedico}
                onChange={handleMedicoChange}
                options={medicos.map((medico) => ({
                    value: medico.id,
                    label: medico.usuario.nome_completo,
                }))}
                isClearable
            />
        </div>
    );
};

export default SelectMedico;
