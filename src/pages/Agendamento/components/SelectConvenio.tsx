import Select from "react-select";
import { getProcedimentoPorConvenio } from "../services/agendamentoService";

interface Convenio {
    id: number;
    razao_social: string;
}

interface SelectConvenioProps {
    convenios: Convenio[];
    selectedConvenio: { value: number; label: string } | null;
    setSelectedConvenio: (convenio: { value: number; label: string } | null) => void;
    setProcedimentosFiltrados: (procedimentos: any[]) => void;
}

const SelectConvenio: React.FC<SelectConvenioProps> = ({ convenios, selectedConvenio, setSelectedConvenio, setProcedimentosFiltrados }) => {
    const handleSelectConvenio = async (selectedOption: { value: number; label: string } | null) => {
        setSelectedConvenio(selectedOption);
        
        if (!selectedOption) {
            setProcedimentosFiltrados([]);
            return;
        }

        try {
            const procedimentos = await getProcedimentoPorConvenio(selectedOption.value);
            setProcedimentosFiltrados(procedimentos);
        } catch (error) {
            console.error("Erro ao buscar procedimentos:", error);
            setProcedimentosFiltrados([]);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Convênios</label>
            <Select
                placeholder="Selecione um convênio"
                value={selectedConvenio}
                onChange={handleSelectConvenio}
                options={convenios.map((convenio) => ({
                    value: convenio.id,
                    label: convenio.razao_social,
                }))}
                isClearable
            />
        </div>
    );
};

export default SelectConvenio;
