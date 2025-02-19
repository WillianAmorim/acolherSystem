import Select from "react-select";

type Procedimento = {
    id: number;
    nome: string;
};

type SelectProcedimentoProps = {
    procedimentosFiltrados: Procedimento[];
    selectedProcedimento: { value: number; label: string } | null;
    setSelectedProcedimento: (procedimento: { value: number; label: string } | null) => void;
};

const SelectProcedimento: React.FC<SelectProcedimentoProps> = ({
    procedimentosFiltrados,
    selectedProcedimento,
    setSelectedProcedimento
}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Procedimento</label>
            <Select
                placeholder="Selecione um procedimento"
                value={selectedProcedimento}
                onChange={setSelectedProcedimento}
                options={procedimentosFiltrados.map((procedimento) => ({
                    value: procedimento.id,
                    label: procedimento.nome,
                }))}
                isDisabled={procedimentosFiltrados.length === 0}
                isClearable
            />
        </div>
    );
};

export default SelectProcedimento;
