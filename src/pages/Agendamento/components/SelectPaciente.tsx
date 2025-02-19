import Select from "react-select";

type Paciente = {
    id: number;
    usuario: {
        nome_completo: string;
    };
};

type OptionType = {
    value: number;
    label: string;
};

type SelectPacienteProps = {
    pacientes: Paciente[];
    selectedPaciente: OptionType | null;
    setSelectedPaciente: (paciente: OptionType | null) => void;
};

const SelectPaciente: React.FC<SelectPacienteProps> = ({ pacientes, selectedPaciente, setSelectedPaciente }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Paciente</label>
            <Select
                placeholder="Selecione um paciente"
                value={selectedPaciente}
                onChange={setSelectedPaciente}
                options={pacientes.map((paciente) => ({
                    value: paciente.id,
                    label: paciente.usuario.nome_completo,
                }))}
                isClearable
            />
        </div>
    );
};

export default SelectPaciente;
