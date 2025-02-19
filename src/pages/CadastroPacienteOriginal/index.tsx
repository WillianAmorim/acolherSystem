import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

const CadastroPaciente: React.FC = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [cpf, setCpf] = useState<string>("");
    const [usuarioEncontrado, setUsuarioEncontrado] = useState<any | null>(null);
    const [estadoCivil, setEstadoCivil] = useState<string>("");
    const [nomeMae, setNomeMae] = useState<string>("");
    const [nomePai, setNomePai] = useState<string>("");
    const [preferencial, setPreferencial] = useState<string>("");
    const [cns, setCns] = useState<string>("");
    const [nomeConjuge, setNomeConjuge] = useState<string>("");
    const [corRaca, setCorRaca] = useState<string>("");
    const [profissao, setProfissao] = useState<string>("");
    const [instrucao, setInstrucao] = useState<string>("");
    const [nacionalidade, setNacionalidade] = useState<string>("");
    const [tipoSanguineo, setTipoSanguineo] = useState<string>("");

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) throw new Error("Token não encontrado");

                const { data } = await axios.get("https://sistema.clinicamultihabilit.com.br/api/usuarios", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const filtrados = data.filter(
                    (user: any) => !user.paciente && !user.medico && !user.atendente
                );
                setUsuarios(filtrados);
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    toast.error('Sessão expirada. Você será redirecionado para o login.', {
                        position: 'bottom-right',
                    });
                    navigate('/login');
                }
                toast.error("Erro ao buscar usuários", { position: "bottom-right" });
                console.error(err);
            }
        };
        fetchUsuarios();
    }, []);

    const handleCpfSearch = () => {
        const usuario = usuarios.find(
            (u) => u.cpf.replace(/[.-]/g, "") === cpf.replace(/[.-]/g, "")
        );
        if (usuario) {
            setUsuarioEncontrado(usuario);
            toast.success("Usuário encontrado! Preencha os dados do paciente.", {
                position: "bottom-right",
            });
        } else {
            setUsuarioEncontrado(null);
            toast.error("Usuário não encontrado.", { position: "bottom-right" });
        }
    };

    const resetForm = () => {
        setEstadoCivil("");
        setNomeMae("");
        setNomePai("");
        setPreferencial("");
        setCns("");
        setNomeConjuge("");
        setCorRaca("");
        setProfissao("");
        setInstrucao("");
        setNacionalidade("");
        setTipoSanguineo("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!usuarioEncontrado) {
            toast.error("Usuário não selecionado.", { position: "bottom-right" });
            return;
        }

        const dadosPaciente = {
            estado_civil: estadoCivil,
            nome_mae: nomeMae,
            nome_pai: nomePai,
            preferencial: preferencial === "true",
            cns,
            nome_conjuge: nomeConjuge,
            cor_raca: corRaca,
            profissao,
            instrucao,
            nacionalidade,
            tipo_sanguineo: tipoSanguineo,
            id_usuario: usuarioEncontrado.id,
        };

        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Token não encontrado");

            await axios.post("https://sistema.clinicamultihabilit.com.br/api/pacientes", dadosPaciente, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Paciente cadastrado com sucesso!", { position: "bottom-right" });
            resetForm();
            setUsuarioEncontrado(null);
            setCpf("");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                toast.error('Sessão expirada. Você será redirecionado para o login.', {
                    position: 'bottom-right',
                });
                navigate('/login');
            }
            toast.error("Erro ao cadastrar paciente.", { position: "bottom-right" });
            console.error(err);
        }
    };

    return (
        <div className="p-8 bg-[#FFF] min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-full mx-auto bg-white shadow-md rounded-lg p-6"
            >
                <div className="flex items-center gap-3 mb-5">
                    {/* <i className="fa-solid fa-circle-plus text-[16px] text-foreground"></i> */}
                    <h3 className="text-2xl font-medium text-[#575757]">Registrar Paciente</h3>
                </div>

                {/* Campo de busca de CPF */}
                <div className="mb-6 max-w-[500px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Buscar por CPF
                    </label>
                    <div className="flex gap-4">
                        <InputMask
                            mask="999.999.999-99"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-md"
                            placeholder="CPF do Usuário"
                        />
                        <button
                            type="button"
                            onClick={handleCpfSearch}
                            className="p-2 bg-primary text-white rounded-md hover:bg-primary-dark w-[50px]"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>

                {/* Formulário de cadastro liberado após busca */}
                {usuarioEncontrado && (
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estado Civil</label>
                            <select
                                value={estadoCivil}
                                onChange={(e) => setEstadoCivil(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                                required
                            >
                                <option value="">Escolha uma opção</option>
                                <option value="solteiro">Solteiro</option>
                                <option value="casado">Casado</option>
                                <option value="divorciado">Divorciado</option>
                                <option value="viuvo">Viúvo</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome da Mãe</label>
                            <input
                                type="text"
                                value={nomeMae}
                                onChange={(e) => setNomeMae(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome do Pai</label>
                            <input
                                type="text"
                                value={nomePai}
                                onChange={(e) => setNomePai(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preferencial</label>
                            <select
                                value={preferencial}
                                onChange={(e) => setPreferencial(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                                required
                            >
                                <option value="">Escolha uma opção</option>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">CNS</label>
                            <input
                                type="text"
                                value={cns}
                                onChange={(e) => setCns(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Conjuge</label>
                            <input
                                type="text"
                                value={nomeConjuge}
                                onChange={(e) => setNomeConjuge(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cor/Raça</label>
                            <select
                                value={corRaca}
                                onChange={(e) => setCorRaca(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                            >
                                <option value="">Escolha uma opção</option>
                                <option value="branca">Branca</option>
                                <option value="preta">Preta</option>
                                <option value="parda">Parda</option>
                                <option value="amarela">Amarela</option>
                                <option value="indigena">Indígena</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Profissão</label>
                            <input
                                type="text"
                                value={profissao}
                                onChange={(e) => setProfissao(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Instrução</label>
                            <select
                                value={instrucao}
                                onChange={(e) => setInstrucao(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                            >
                                <option value="">Escolha uma opção</option>
                                <option value="fundamental-incompleto">Fundamental Incompleto</option>
                                <option value="fundamental-completo">Fundamental Completo</option>
                                <option value="medio-incompleto">Médio Incompleto</option>
                                <option value="medio-completo">Médio Completo</option>
                                <option value="superior-incompleto">Superior Incompleto</option>
                                <option value="superior-completo">Superior Completo</option>
                                <option value="sem-instrucao">Sem Instrução</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nacionalidade</label>
                            <input
                                type="text"
                                value={nacionalidade}
                                onChange={(e) => setNacionalidade(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tipo Sanguíneo</label>
                            <select
                                value={tipoSanguineo}
                                onChange={(e) => setTipoSanguineo(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md w-full"
                            >
                                <option value="">Escolha uma opção</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className="mt-6">
                    <button
                        disabled={!usuarioEncontrado}
                        type="submit"
                        className={`w-[120px] p-2 text-white rounded-md ${!usuarioEncontrado ? "bg-gray-300 cursor-not-allowed" : "bg-[#094D6F] hover:bg-[#56719C]"
                            }`}
                    >
                        Registrar
                    </button>
                </div>
                <ToastContainer />
            </form>
        </div>
    );
};

export default CadastroPaciente;
