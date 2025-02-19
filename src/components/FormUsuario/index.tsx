import InputMask from "react-input-mask";
import Input from "../Input";
import Select from "../Select";

interface FormularioUsuarioProps {
    dadosUsuario: {
        nome_completo: string;
        email: string;
        password: string;
        data_nascimento: string;
        sexo: string;
        rg: string;
        cpf: string;
        nome_social: string;
        telefone: string;
        celular: string;
        role: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormularioUsuario: React.FC<FormularioUsuarioProps> = ({ dadosUsuario, onChange }) => {
    return (
        <>
            <div className="flex p-2 gap-4">
                <Input
                    type="text"
                    value={dadosUsuario.nome_completo}
                    onChange={onChange}
                    name="nome_completo"
                    placeholder="Nome Completo"
                    valueLabel="Nome Completo"
                    labelWidthValue="w-1/5"
                />
                <Input
                    type="text"
                    value={dadosUsuario.nome_social}
                    onChange={onChange}
                    name="nome_social"
                    placeholder="Nome Social"
                    valueLabel="Nome Social"
                    labelWidthValue="w-1/5"
                />
                <Input
                    type="password"
                    value={dadosUsuario.password}
                    onChange={onChange}
                    name="password"
                    placeholder="Senha"
                    valueLabel="Senha"
                    labelWidthValue="w-1/6"
                />
                <label className="flex flex-col w-1/7 text-sm">
                    CPF
                    <InputMask
                        mask="999.999.999-99"
                        value={dadosUsuario.cpf}
                        onChange={onChange}
                        name="cpf"
                        placeholder="CPF"
                        className="bg-white border border-gray-300 p-2 rounded-md w-full"
                    />
                </label>
                <label className="flex flex-col w-1/7 text-sm">
                    RG
                    <InputMask
                        mask="99.999.999-9"
                        value={dadosUsuario.rg}
                        onChange={onChange}
                        name="rg"
                        placeholder="RG"
                        className="bg-white border border-gray-300 p-2 rounded-md w-full"
                    />
                </label>
            </div>
            <div className="flex p-2 gap-4">
                <Input
                    type="email"
                    value={dadosUsuario.email}
                    onChange={onChange}
                    name="email"
                    placeholder="E-mail"
                    valueLabel="E-mail"
                    labelWidthValue="w-1/5"
                />
                <Select
                    value={dadosUsuario.sexo}
                    onChange={onChange}
                    name="sexo"
                    options={[
                        { value: "", label: "Selecione uma opção" },
                        { value: "masculino", label: "Masculino" },
                        { value: "feminino", label: "Feminino" },
                    ]}
                    valueLabel="Sexo"
                />
                <label className="flex flex-col w-1/7 text-sm">
                    Telefone
                    <InputMask
                        mask="(99) 99999-9999"
                        value={dadosUsuario.telefone}
                        onChange={onChange}
                        name="telefone"
                        placeholder="Telefone"
                        className="bg-white border border-gray-300 p-2 rounded-md w-full"
                    />
                </label>
                <label className="flex flex-col w-1/7 text-sm">
                    Celular
                    <InputMask
                        mask="(99) 9 9999-9999"
                        value={dadosUsuario.celular}
                        onChange={onChange}
                        name="celular"
                        placeholder="Celular"
                        className="bg-white border border-gray-300 p-2 rounded-md w-full"
                    />
                </label>
                <Input
                    type="date"
                    value={dadosUsuario.data_nascimento}
                    onChange={onChange}
                    name="data_nascimento"
                    placeholder="Data de Nascimento"
                    valueLabel="Data de Nascimento"
                    labelWidthValue="w-1/6"
                />
            </div>
        </>
    );
};

export default FormularioUsuario;
