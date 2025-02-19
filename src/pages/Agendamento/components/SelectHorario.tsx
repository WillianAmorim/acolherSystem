import { useEffect } from "react";

interface Horario {
    id: number;
    horario: string;
}

const SelectHorario = ({ horariosPorData = [] as Horario[], horaSelecionada, setHoraSelecionada }: { horariosPorData: Horario[], horaSelecionada: string, setHoraSelecionada: (hora: string) => void }) => {
    useEffect(() => {
        console.log("📌 Estado atualizado - horários disponíveis:", horariosPorData);
    }, [horariosPorData]); // ✅ Observando o estado correto

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Horários Disponíveis</label>
            <select 
                className="border rounded-md p-2 text-[#808080]" 
                value={horaSelecionada} 
                onChange={(e) => setHoraSelecionada(e.target.value)}
                disabled={horariosPorData.length === 0} // ✅ Garante que só habilita se houver horários
            >
                <option value="">Escolha um horário</option>
                {horariosPorData.length > 0 ? (
                    horariosPorData.map((horario) => (
                        <option key={horario.id} value={horario.horario}>
                            {horario.horario}
                        </option>
                    ))
                ) : (
                    <option value="">Nenhum horário disponível</option>
                )}
            </select>
        </div>
    );
};

export default SelectHorario;
