import { ChangeEvent, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Button from "@/components/Button";
import InputMask from "react-input-mask";
import Input from "@/components/Input";
import Select from "@/components/Select";

const Cadastro = () => {
    const navigate = useNavigate();

    // Estados do usuário
    const [dadosPaciente, setDadosPaciente] = useState({
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
        role: "paciente",
        paciente: {
            estado_civil: "",
            nome_mae: "",
            nome_pai: "",
            preferencial: "",
            cns: "",
            nome_conjuge: "",
            cor_raca: "",
            profissao: "",
            instrucao: "",
            nacionalidade: "",
            tipo_sanguineo: "",
        }
    });

    // Reseta os formulários
    const resetForm = () => {
        setDadosPaciente({
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
            role: "paciente",
            paciente: {
                estado_civil: "",
                nome_mae: "",
                nome_pai: "",
                preferencial: "",
                cns: "",
                nome_conjuge: "",
                cor_raca: "",
                profissao: "",
                instrucao: "",
                nacionalidade: "",
                tipo_sanguineo: "",
            }
        });
    };

    // Submissão do formulário
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("authToken");

            // Cadastro do usuário
            await axios.post(
                "https://sistema.clinicamultihabilit.com.br/api/usuarios",
                {
                    ...dadosPaciente,
                    sexo: dadosPaciente.sexo.charAt(0).toUpperCase() + dadosPaciente.sexo.slice(1), // Ajuste para "Masculino" ou "Feminino"
                    cpf: dadosPaciente.cpf.replace(/[.-]/g, ""), // Remove pontos e traços do CPF
                    paciente: {
                        ...dadosPaciente.paciente,
                        preferencial: Boolean(dadosPaciente.paciente.preferencial), // Garante que preferencial seja booleano
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            resetForm();
            toast.success("Usuário cadastrado com sucesso!", { position: "bottom-right" });
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                toast.error('Sessão expirada. Você será redirecionado para o login.', {
                    position: 'bottom-right',
                });
                navigate('/login');
            }
            if (axios.isAxiosError(err)) {
                const errors = err.response?.data?.errors;
                if (errors) {
                    Object.keys(errors).forEach((campo) => {
                        (errors[campo] as string[]).forEach((mensagem) =>
                            toast.error(mensagem, { position: "bottom-right" })
                        );
                    });
                }
            } else {
                toast.error("Erro ao cadastrar o usuário.", { position: "bottom-right" });
            }
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setDadosPaciente((prevState) => {
            // Verifica se o campo pertence ao objeto 'paciente'
            if (name in prevState.paciente) {
                const updatedPaciente = {
                    ...prevState.paciente,
                    [name]: value, // Atualiza o campo dentro de 'paciente'
                };

                return {
                    ...prevState,
                    paciente: updatedPaciente,
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
            <div className="w-full bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-2xl font-medium text-[#575757] mb-4">Cadastro Paciente</h3>
                    {/* <FormularioUsuario dadosUsuario={dadosUsuario} onChange={handleUsuarioChange} /> */}
                    <div className="flex p-2 gap-4">
                        <Input
                            type="text"
                            value={dadosPaciente.nome_completo}
                            onChange={onChange}
                            name="nome_completo"
                            placeholder="Nome Completo"
                            valueLabel="Nome Completo"
                            labelWidthValue="w-1/5"
                        />
                        <Input
                            type="text"
                            value={dadosPaciente.nome_social}
                            onChange={onChange}
                            name="nome_social"
                            placeholder="Nome Social"
                            valueLabel="Nome Social"
                            labelWidthValue="w-1/5"
                            campoRequired={false}
                        />
                        {/* <Input
                            type="password"
                            value={dadosPaciente.password}
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
                                value={dadosPaciente.cpf}
                                onChange={onChange}
                                name="cpf"
                                placeholder="CPF"
                                className="bg-white border border-gray-300 p-2 rounded-md w-full"
                            />
                        </label>
                        {/* <label className="flex flex-col w-1/7 text-sm">
                            RG
                            <InputMask
                                mask="99.999.999-9"
                                value={dadosPaciente.rg}
                                onChange={onChange}
                                name="rg"
                                placeholder="RG"
                                className="bg-white border border-gray-300 p-2 rounded-md w-full"
                            />
                        </label> */}
                        <Input
                            type="text"
                            value={dadosPaciente.rg}
                            onChange={onChange}
                            name="rg"
                            placeholder="RG"
                            valueLabel="RG"
                            labelWidthValue="w-1/5"
                            campoRequired={false}
                        />
                    </div>
                    <div className="flex p-2 gap-4">
                        <Input
                            type="email"
                            value={dadosPaciente.email}
                            onChange={onChange}
                            name="email"
                            placeholder="E-mail"
                            valueLabel="E-mail"
                            labelWidthValue="w-1/5"
                        />
                        <Select
                            value={dadosPaciente.sexo}
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
                                value={dadosPaciente.telefone}
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
                                value={dadosPaciente.celular}
                                onChange={onChange}
                                name="celular"
                                placeholder="Celular"
                                className="bg-white border border-gray-300 p-2 rounded-md w-full"
                            />
                        </label>
                        <Input
                            type="date"
                            value={dadosPaciente.data_nascimento}
                            onChange={onChange}
                            name="data_nascimento"
                            placeholder="Data de Nascimento"
                            valueLabel="Data de Nascimento"
                            labelWidthValue="w-1/6"
                        />
                    </div>
                    <div className="flex p-2 gap-4">
                        <Select
                            value={dadosPaciente.paciente.estado_civil}
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
                            value={dadosPaciente.paciente.nome_mae}
                            onChange={onChange}
                            name="nome_mae"
                            placeholder="Nome da Mãe"
                            valueLabel="Nome da Mãe"
                            labelWidthValue="w-1/5"
                        />
                        <Input
                            type="text"
                            value={dadosPaciente.paciente.nome_pai}
                            onChange={onChange}
                            name="nome_pai"
                            placeholder="Nome do Pai"
                            valueLabel="Nome do Pai"
                            labelWidthValue="w-1/5"
                        />
                        <Select
                            value={String(dadosPaciente.paciente.preferencial)} // Converte booleano para string para o select
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
                            value={dadosPaciente.paciente.cns}
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
                            value={dadosPaciente.paciente.nome_conjuge}
                            onChange={onChange}
                            name="nome_conjuge"
                            placeholder="Cônjuge"
                            valueLabel="Cônjuge"
                            labelWidthValue="w-1/5"
                        />
                        <Select
                            value={dadosPaciente.paciente.cor_raca}
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
                            value={dadosPaciente.paciente.profissao}
                            onChange={onChange}
                            name="profissao"
                            placeholder="Profissão"
                            valueLabel="Profissão"
                            labelWidthValue="w-1/6"
                        />
                        <Select
                            value={dadosPaciente.paciente.instrucao}
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
                            value={dadosPaciente.paciente.nacionalidade}
                            onChange={onChange}
                            name="nacionalidade"
                            placeholder="Nacionalidade"
                            valueLabel="Nacionalidade"
                            labelWidthValue="w-1/5"
                        />
                    </div>
                    {/* <div className="flex p-2 gap-4">
                        <Select
                            value={dadosPaciente.paciente.tipo_sanguineo}
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
                    </div> */}
                    <Button type='submit'>Cadastrar</Button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Cadastro;
