import { ChangeEvent, useState } from "react";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "@/components/Input";
import Select from "@/components/Select";
import InputMask from "react-input-mask";
import { ToastContainer } from "react-toastify";

const CadastroTerapeuta = () => {

    const navigate = useNavigate();

    const [inputCNPJ, setInputCNPJ] = useState(false)

    const [dadosMedico, setDadosMedico] = useState({
        nome_completo: "",
        email: "",
        password: "12345678",
        data_nascimento: "",
        sexo: "",
        rg: "",
        cpf: "",
        nome_social: "",
        telefone: "",
        celular: "",
        role: "medico",
        medico: {
            regime_trabalhista: "",
            carga_horaria: "",
            cnpj: ""
        }
    });

    const resetForm = () => {
        setDadosMedico({
            nome_completo: "",
            email: "",
            password: "",
            data_nascimento: "",
            sexo: "",
            rg: "",
            cpf: "",
            nome_social: "",
            telefone: "",
            celular: "",
            role: "medico",
            medico: {
                regime_trabalhista: "",
                carga_horaria: "",
                cnpj: ""
            }
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("Sessão expirada. Faça login novamente.", { position: "bottom-right" });
            navigate('/login');
            return;
        }

        try {
            // Cadastro do usuário
            await axios.post(
                "https://sistema.clinicaacolherslz.com.br/api/usuarios",
                {
                    ...dadosMedico,
                    sexo: dadosMedico.sexo.charAt(0).toUpperCase() + dadosMedico.sexo.slice(1), // Ajuste para "Masculino" ou "Feminino"
                    cpf: dadosMedico.cpf.replace(/[.-]/g, ""), // Remove pontos e traços do CPF
                    carga_horaria: Number(dadosMedico.medico.carga_horaria), // Converte para númeroD
                    regime_trabalhista: Number(dadosMedico.medico.regime_trabalhista), // Converte para número
                    cnpj: dadosMedico.medico.cnpj.replace(/[.-/]/g, ""), // Remove pontos, traços e barras do CNPJ
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            resetForm();
            toast.success("Terapeuta cadastrado com sucesso!", { position: "top-right" });
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                toast.error('Sessão expirada. Você será redirecionado para o login.', {
                    position: 'bottom-right',
                });
                navigate('/login');
            } else if (axios.isAxiosError(err)) {
                const errors = err.response?.data?.errors;
                if (errors) {
                    Object.keys(errors).forEach((campo) => {
                        (errors[campo] as string[]).forEach((mensagem) =>
                            toast.error(mensagem, { position: "bottom-right" })
                        );
                    });
                }
            } else {
                toast.error("Erro ao cadastrar o terapeuta. Nenhuma ação foi realizada.", { position: "bottom-right" });
            }
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setDadosMedico((prevState) => {
            // Verifica se o campo pertence ao objeto 'medico'
            if (name in prevState.medico) {
                const updatedMedico = {
                    ...prevState.medico,
                    [name]: value, // Atualiza o campo dentro de 'medico'
                };

                // Atualiza o estado 'inputCNPJ' se o regime_trabalhista for "PJ"
                if (name === "regime_trabalhista") {
                    setInputCNPJ(value === "1"); // "1" representa PJ
                }

                return {
                    ...prevState,
                    medico: updatedMedico,
                };
            }

            // Caso contrário, atualiza o campo no nível raiz
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    return (
        <div className="p-4 bg-[#FFF] min-h-screen">
            <form onSubmit={handleSubmit}>
                <div className="flex p-2 gap-4">
                    <Input
                        type="text"
                        value={dadosMedico.nome_completo}
                        onChange={onChange}
                        name="nome_completo"
                        placeholder="Nome Completo"
                        valueLabel="Nome Completo"
                        labelWidthValue="w-1/5"
                    />
                    <Input
                        type="text"
                        value={dadosMedico.nome_social}
                        onChange={onChange}
                        name="nome_social"
                        placeholder="Nome Social"
                        valueLabel="Nome Social"
                        labelWidthValue="w-1/5"
                        campoRequired={false}
                    />
                    {/* <Input
                        type="password"
                        value={dadosMedico.password}
                        onChange={onChange}
                        name="password"
                        placeholder="Senha"
                        valueLabel="Senha"
                        labelWidthValue="w-1/6"
                    /> */}
                    <label className="flex flex-col w-1/7 text-sm">
                        CPF
                        <InputMask
                            mask="999.999.999-99"
                            value={dadosMedico.cpf}
                            onChange={onChange}
                            name="cpf"
                            placeholder="CPF"
                            className="bg-white border border-gray-300 p-2 rounded-md w-full"
                        />
                    </label>
                    <Input
                        type="text"
                        value={dadosMedico.rg}
                        onChange={onChange}
                        name="rg"
                        placeholder="RG"
                        valueLabel="RG"
                        labelWidthValue="w-1/6"
                    />
                    {/* <label className="flex flex-col w-1/7 text-sm">
                        RG
                        <InputMask
                            mask="999999999999999"
                            value={dadosMedico.rg}
                            onChange={onChange}
                            name="rg"
                            placeholder="RG"
                            className="bg-white border border-gray-300 p-2 rounded-md w-full"
                        />
                    </label> */}
                </div>
                <div className="flex p-2 gap-4">
                    <Input
                        type="email"
                        value={dadosMedico.email}
                        onChange={onChange}
                        name="email"
                        placeholder="E-mail"
                        valueLabel="E-mail"
                        labelWidthValue="w-1/5"
                    />
                    <Select
                        value={dadosMedico.sexo}
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
                            value={dadosMedico.telefone}
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
                            value={dadosMedico.celular}
                            onChange={onChange}
                            name="celular"
                            placeholder="Celular"
                            className="bg-white border border-gray-300 p-2 rounded-md w-full"
                        />
                    </label>
                    <Input
                        type="date"
                        value={dadosMedico.data_nascimento}
                        onChange={onChange}
                        name="data_nascimento"
                        placeholder="Data de Nascimento"
                        valueLabel="Data de Nascimento"
                        labelWidthValue="w-1/6"
                    />
                </div>
                <div className="flex p-2 gap-4">
                    <Select
                        value={dadosMedico.medico.regime_trabalhista}
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
                        value={dadosMedico.medico.carga_horaria}
                        onChange={onChange}
                        name="carga_horaria"
                        placeholder="Carga horária"
                        valueLabel="Carga horária"
                        labelWidthValue="w-1/6"
                    />
                    {inputCNPJ && (
                        <Input
                            type="text"
                            value={dadosMedico.medico.cnpj}
                            onChange={onChange}
                            name="cnpj"
                            placeholder="CNPJ"
                            valueLabel="CNPJ"
                            labelWidthValue="w-1/6"
                        />
                    )}
                </div>
                {/* <FormTerapeuta dadosTerapeuta={dadosMedico} onChange={handleTerapeutaChange} inputCNPJ={inputCNPJ} /> */}
                <Button type='submit'>Cadastrar</Button>
            </form>
            <ToastContainer />
        </div>

    )
}

export default CadastroTerapeuta