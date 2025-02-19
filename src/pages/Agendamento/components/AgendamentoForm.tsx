import { useAgendamento } from "../hooks/useAgendamento";
import Button from "@/components/Button";
import Input from "@/components/Input";
import SelectPaciente from "./SelectPaciente";
import SelectMedico from "./SelectMedico";
import SelectConvenio from "./SelectConvenio";
import SelectProcedimento from "./SelectProcedimento";
import SelectHorario from "./SelectHorario";
import { useState } from "react";

const AgendamentoForm = () => {
    const { handleSubmit, ...agendamentoState } = useAgendamento();
    const [diaSemana, setDiaSemana] = useState<string>("");

    const getDiaSemana = (data: string): string => {
        if (!data) return "";
        const diasSemana = ["domingo", "segunda-feira", "terca-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sabado"];
        const dataObj = new Date(data + "T00:00:00"); 
        return diasSemana[dataObj.getDay()];
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dataSelecionada = e.target.value;
        agendamentoState.setDiaSelecionado(dataSelecionada);
        setDiaSemana(getDiaSemana(dataSelecionada));
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="w-full bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-medium text-[#575757] mb-4">Novo Agendamento</h3>
            
            <div className="grid grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dia</label>
                    <Input 
                        type="date" 
                        name="dia"
                        placeholder="Escolha uma data"
                        labelWidthValue="w-1/3"
                        value={agendamentoState.diaSelecionado} 
                        onChange={handleDateChange} 
                    />
                    {diaSemana && <p className="text-sm text-gray-600 mt-1">Dia da semana: {diaSemana}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unidade</label>
                    <select 
                        className="border p-2 rounded-md w-full" 
                        value={agendamentoState.selectedUnidade} 
                        onChange={(e) => agendamentoState.setSelectedUnidade(e.target.value)}
                    >
                        <option value="">Selecione uma unidade</option>
                        <option value="multi-habilit">Multi Habilit</option>
                    </select>
                </div>

                <SelectPaciente 
                    pacientes={agendamentoState.pacientes}
                    selectedPaciente={agendamentoState.selectedPaciente}
                    setSelectedPaciente={agendamentoState.setSelectedPaciente}
                />

                
                <SelectMedico 
                    medicos={agendamentoState.medicos}
                    selectedMedico={agendamentoState.selectedMedico}
                    setSelectedMedico={agendamentoState.setSelectedMedico}
                    setMedicoHorarios={agendamentoState.setMedicoHorarios}
                    setHorariosPorData={agendamentoState.setHorariosPorData}
                    diaSemana={diaSemana}
                    diaSelecionado={agendamentoState.diaSelecionado}
                />

                <SelectConvenio 
                    convenios={agendamentoState.convenios}
                    selectedConvenio={agendamentoState.selectedConvenio}
                    setSelectedConvenio={agendamentoState.setSelectedConvenio}
                    setProcedimentosFiltrados={agendamentoState.setProcedimentosFiltrados}
                />

                <SelectProcedimento 
                    procedimentosFiltrados={agendamentoState.procedimentosFiltrados}
                    selectedProcedimento={agendamentoState.selectedProcedimento}
                    setSelectedProcedimento={agendamentoState.setSelectedProcedimento}
                />

                <SelectHorario {...agendamentoState} />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                    <select 
                        className="border p-2 rounded-md w-full" 
                        value={agendamentoState.optionTipoAgendamento} 
                        onChange={(e) => agendamentoState.setOptionTipoAgendamento(e.target.value)}
                    >
                        <option value="">Selecione uma opção</option>
                        <option value="exame">Exame</option>
                        <option value="consulta-eletiva">Consulta Eletiva</option>
                        <option value="terapia">Terapia</option>
                    </select>
                </div>
            </div>

            {agendamentoState.selectedConvenio && "modo_recebimento" in agendamentoState.selectedConvenio && 
                agendamentoState.selectedConvenio.modo_recebimento === "convenio" && (
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nº Guia</label>
                    <Input 
                        type="number"
                        name="numeroGuia"
                        placeholder="Digite o número da guia"
                        labelWidthValue="w-1/3"
                        value={agendamentoState.numeroGuia}
                        onChange={(e) => agendamentoState.setNumeroGuia(e.target.value)}
                    />
                </div>
            )}

            <div className="mt-6">
                <Button type="submit">Agendar</Button>
            </div>
        </form>
    );
};

export default AgendamentoForm;
