import InputMask from "react-input-mask";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CadastroUsuario = () => {

    const navigate = useNavigate();

    const [nome_completo, setNomeCompleto] = useState<string>()
    const [nome_social, setNomeSocial] = useState<string>()
    // const [password, setPassword] = useState<string>()
    const [cpf, setCpf] = useState<string>()
    const [rg, setRg] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [sexo, setSexo] = useState<string>("")
    const [telefone, setTelefone] = useState<string>("")
    const [celular, setCelular] = useState<string>("")
    const [data_nascimento, setDataNascimento] = useState<string>("")
    const [role, setRole] = useState<string>('')

    const resetForm = () => {
        setNomeCompleto('')
        setNomeSocial('')
        // setPassword('')
        setCpf('')
        setRg('')
        setEmail('')
        setSexo('')
        setTelefone('')
        setCelular('')
        setDataNascimento('')
        setRole('')
    }

    const fetchDadosUsuario = async () => {
        const dadosUsuario = {
            nome_completo,
            nome_social,
            password: '12345678',
            cpf: (cpf!).replace(/[.-]/g, ""), // Remove pontos e traços do CPF
            rg,
            email,
            sexo,
            telefone,
            celular,
            data_nascimento,
            role
        }

        try {
            const token = localStorage.getItem("authToken");
            await axios.post('https://sistema.clinicamultihabilit.com.br/api/usuarios', dadosUsuario, {
                headers: { Authorization: `Bearer ${token}` },
            });

            resetForm();
            toast.success("Agendamento realizado com sucesso!", {
                position: "bottom-right",
                // onClose: () => navigate("/agenda"),
            });
        } catch (err) {
            console.error(err);
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                toast.error('Sessão expirada. Você será redirecionado para o login.', {
                    position: 'bottom-right',
                });
                navigate('/login');
            }
            toast.error("Erro ao carregar dados.", { position: "bottom-right" });
        }

    }

    return (
        <div className="p-8 bg-[#FFF] min-h-screen">
            <div>
                <div className="flex p-2 gap-4">
                    <Input
                        type="text"
                        value={nome_completo}
                        onChange={(e) => setNomeCompleto(e.target.value)}
                        name="nome_completo"
                        placeholder="Nome Completo"
                        valueLabel="Nome Completo"
                        labelWidthValue="w-1/5"
                    />
                    <Input
                        type="text"
                        value={nome_social}
                        onChange={(e) => setNomeSocial(e.target.value)}
                        name="nome_social"
                        placeholder="Nome Social"
                        valueLabel="Nome Social"
                        labelWidthValue="w-1/5"
                    />
                    {/* <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder="Senha"
                        valueLabel="Senha"
                        labelWidthValue="w-1/6"
                    /> */}
                    <label className="flex flex-col w-1/7 text-sm">
                        CPF
                        <InputMask
                            mask="999.999.999-99"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            name="cpf"
                            placeholder="CPF"
                            className="bg-white border border-gray-300 p-2 rounded-md w-full"
                        />
                    </label>
                    {/* <label className="flex flex-col w-1/7 text-sm">
                        RG
                        <InputMask
                            mask="99.999.999-9"
                            value={rg}
                            onChange={(e) => setRg(e.target.value)}
                            name="rg"
                            placeholder="RG"
                            className="bg-white border border-gray-300 p-2 rounded-md w-full"
                        />
                    </label> */}
                    <Input
                            type="text"
                            value={rg}
                            onChange={(e) => setRg(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        placeholder="E-mail"
                        valueLabel="E-mail"
                        labelWidthValue="w-1/5"
                    />
                    <Select
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
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
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            name="telefone"
                            placeholder="Telefone"
                            className="bg-white border border-gray-300 p-2 rounded-md w-full"
                        />
                    </label>
                    <label className="flex flex-col w-1/7 text-sm">
                        Celular
                        <InputMask
                            mask="(99) 9 9999-9999"
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)}
                            name="celular"
                            placeholder="Celular"
                            className="bg-white border border-gray-300 p-2 rounded-md w-full"
                        />
                    </label>
                    <Input
                        type="date"
                        value={data_nascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                        name="data_nascimento"
                        placeholder="Data de Nascimento"
                        valueLabel="Data de Nascimento"
                        labelWidthValue="w-1/6"
                    />
                </div>
                <div className="flex p-2 gap-4">
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        name="sexo"
                        options={[
                            { value: "", label: "Selecione uma opção" },
                            { value: "atendente", label: "Recepcionista" },
                            { value: "admin", label: "Coordenador" },
                            { value: "admin-master", label: "Gerente" },
                        ]}
                        valueLabel="Sexo"
                    />
                </div>
                <button className="mt-4 bg-green-400 text-white p-2 rounded-md" onClick={fetchDadosUsuario}>Cadastrar</button>
            </div>
        </div>
    );
}

export default CadastroUsuario