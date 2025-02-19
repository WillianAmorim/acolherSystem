import Input from "@/components/Input"
import Select from "@/components/Select"

interface FormularioTerapeutaProps {
    dadosTerapeuta: {
        regime_trabalhista: string;
        carga_horaria: string;
        cnpj?: string | undefined;
    };
    inputCNPJ: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormTerapeuta: React.FC<FormularioTerapeutaProps> = ({ dadosTerapeuta, onChange, inputCNPJ }) => {
    return (
        <>
            <div className="flex p-2 gap-4">
                <Select
                    value={dadosTerapeuta.regime_trabalhista}
                    onChange={onChange}
                    name="regime_trabalhista"
                    options={[
                        { value: "", label: "Selecione uma opção" },
                        { value: "0", label: "CLT" },
                        { value: "1", label: "PJ" },
                    ]}
                    valueLabel="Regime de trabalho"
                />
                <Input
                    type="number"
                    value={dadosTerapeuta.carga_horaria}
                    onChange={onChange}
                    name="carga_horaria"
                    placeholder="Carga horária"
                    valueLabel="Carga horária"
                    labelWidthValue="w-1/6"
                />
                {inputCNPJ && (
                    <Input
                        type="number"
                        value={dadosTerapeuta.cnpj}
                        onChange={onChange}
                        name="cnpj"
                        placeholder="CNPJ"
                        valueLabel="CNPJ"
                        labelWidthValue="w-1/6"
                    />
                )}
            </div>
        </>
    )
}

export default FormTerapeuta