import Input from "@/components/Input";
import Select from "@/components/Select";

interface FormularioPacienteProps {
    dadosPaciente: {
        estado_civil: string;
        nome_mae: string;
        nome_pai: string;
        preferencial: string;
        cns: string;
        nome_conjuge: string;
        cor_raca: string;
        profissao: string;
        instrucao: string;
        nacionalidade: string;
        tipo_sanguineo: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormularioPaciente: React.FC<FormularioPacienteProps> = ({
    dadosPaciente,
    onChange,
}) => {
    return (
        <>
            <div className="flex p-2 gap-4">
                <Select
                    value={dadosPaciente.estado_civil}
                    onChange={onChange}
                    name="estado_civil"
                    options={[
                        { value: "", label: "Selecione uma opção" },
                        { value: "solteiro", label: "Solteiro" },
                        { value: "casado", label: "Casado" },
                        { value: "divorciado", label: "Divorciado" },
                        { value: "viuvo", label: "Viúvo" },
                    ]}
                    valueLabel="Estado Civil"
                />
                <Input
                    type="text"
                    value={dadosPaciente.nome_mae}
                    onChange={onChange}
                    name="nome_mae"
                    placeholder="Nome da Mãe"
                    valueLabel="Nome da Mãe"
                    labelWidthValue="w-1/5"
                />
                <Input
                    type="text"
                    value={dadosPaciente.nome_pai}
                    onChange={onChange}
                    name="nome_pai"
                    placeholder="Nome do Pai"
                    valueLabel="Nome do Pai"
                    labelWidthValue="w-1/5"
                />
                <Select
                    value={String(dadosPaciente.preferencial)} // Converte booleano para string para o select
                    onChange={onChange}
                    name="preferencial"
                    options={[
                        { value: "", label: "Selecione uma opção" },
                        { value: "true", label: "Sim" },
                        { value: "false", label: "Não" },
                    ]}
                    valueLabel="É Preferencial?"
                />
                <Input
                    type="number"
                    value={dadosPaciente.cns}
                    onChange={onChange}
                    name="cns"
                    placeholder="CNS"
                    valueLabel="CNS/Carteira Plano"
                    labelWidthValue="w-1/6"
                />
            </div>
            <div className="flex p-2 gap-4">
                <Input
                    type="text"
                    value={dadosPaciente.nome_conjuge}
                    onChange={onChange}
                    name="nome_conjuge"
                    placeholder="Cônjuge"
                    valueLabel="Cônjuge"
                    labelWidthValue="w-1/5"
                />
                <Select
                    value={dadosPaciente.cor_raca}
                    onChange={onChange}
                    name="cor_raca"
                    options={[
                        { value: "", label: "Selecione uma opção" },
                        { value: "branca", label: "Branca" },
                        { value: "preta", label: "Preta" },
                        { value: "parda", label: "Parda" },
                        { value: "amarela", label: "Amarela" },
                        { value: "indigena", label: "Indígena" },
                    ]}
                    valueLabel="Cor/Raça"
                />
                <Input
                    type="text"
                    value={dadosPaciente.profissao}
                    onChange={onChange}
                    name="profissao"
                    placeholder="Profissão"
                    valueLabel="Profissão"
                    labelWidthValue="w-1/6"
                />
                <Select
                    value={dadosPaciente.instrucao}
                    onChange={onChange}
                    name="instrucao"
                    options={[
                        { value: "", label: "Selecione uma opção" },
                        { value: "fundamental-incompleto", label: "Fundamental Incompleto" },
                        { value: "fundamental-completo", label: "Fundamental Completo" },
                        { value: "medio-incompleto", label: "Médio Incompleto" },
                        { value: "medio-completo", label: "Médio Completo" },
                        { value: "superior-incompleto", label: "Superior Incompleto" },
                        { value: "superior-completo", label: "Superior Completo" },
                        { value: "sem-instrucao", label: "Sem Instrução" },
                    ]}
                    valueLabel="Instrução"
                />
                <Input
                    type="text"
                    value={dadosPaciente.nacionalidade}
                    onChange={onChange}
                    name="nacionalidade"
                    placeholder="Nacionalidade"
                    valueLabel="Nacionalidade"
                    labelWidthValue="w-1/5"
                />
            </div>
            <div className="flex p-2 gap-4">
                <Select
                    value={dadosPaciente.tipo_sanguineo}
                    onChange={onChange}
                    name="tipo_sanguineo"
                    options={[
                        { value: "", label: "Selecione uma opção" },
                        { value: "A+", label: "A+" },
                        { value: "A-", label: "A-" },
                        { value: "B+", label: "B+" },
                        { value: "B-", label: "B-" },
                        { value: "AB+", label: "AB+" },
                        { value: "AB-", label: "AB-" },
                        { value: "O+", label: "O+" },
                        { value: "O-", label: "O-" },
                    ]}
                    valueLabel="Tipo Sanguíneo"
                />
            </div>
        </>
    );
};

export default FormularioPaciente;
