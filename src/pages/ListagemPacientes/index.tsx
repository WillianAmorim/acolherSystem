import { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Input from '@/components/Input';
import InputMask from 'react-input-mask';
import Select from '@/components/Select';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', // Ajuste a largura do modal
        height: '80%', // Ajuste a altura do modal
        zIndex: 1000, // Ajuste o z-index para garantir que o modal fique acima da sidebar
    },
    overlay: {
        zIndex: 999, // Ajuste o z-index do overlay para garantir que ele fique acima da sidebar
    },
};

interface Usuario {
    nome_completo: string;
    nome_social: string;
    cpf: string;
    rg: string;
    email: string;
    sexo: string;
    telefone: string;
    celular: string;
    data_nascimento: string;
}

interface Paciente {
    estado_civil: string;
    nome_mae: unknown;
    nome_pai: unknown;
    preferencial(preferencial: any): string;
    cns: unknown;
    nome_conjuge: unknown;
    cor_raca: string;
    profissao: unknown;
    instrucao: string;
    nacionalidade: unknown;
    tipo_sanguineo: string;
    id: number;
    usuario: Usuario;
}

const ListagemPacientes = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [pacientes, setPacientes] = useState<Paciente[]>([]); // Estado de pacientes
    const [isEditing, setIsEditing] = useState(false);


    const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [scheduleModalIsOpen, setScheduleModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchPacientes = async () => {
            setLoading(true); // Inicia o carregamento
            try {
                const token = localStorage.getItem("authToken");
                const { data: pacientes } = await axios.get(
                    "https://sistema.clinicamultihabilit.com.br/api/pacientes",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setPacientes(pacientes.original);
                console.log(pacientes.original);
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    toast.error('Sessão expirada. Você será redirecionado para o login.', {
                        position: 'bottom-right',
                    });
                    navigate('/login');
                }
                toast.error("Erro ao buscar pacientes.", { position: "bottom-right" });
                console.error(err);
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchPacientes();
    }, [navigate]);

    const handleViewDetails = (paciente: any) => {
        setSelectedPaciente(paciente);
        setModalIsOpen(true);
        setIsEditing(false); // Inicia o modal em modo de somente leitura
        console.log(selectedPaciente, 'selectedPaciente');
    };
    
    const handleDeleteUser = async (paciente: any) => {
        Swal.fire({
            title: 'Confirmação de Exclusão',
            text: 'Tem certeza que deseja excluir este terapeuta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Não, cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true); // Inicia o carregamento
                try {
                    const token = localStorage.getItem("authToken");
                    await axios.delete(`https://sistema.clinicamultihabilit.com.br/api/pacientes/${paciente.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setPacientes(prevPacientes => prevPacientes.filter((p) => p.id !== paciente.id));
                    toast.success("Usuário deletado com sucesso!", { position: "bottom-right" });
                } catch (err) {
                    toast.error("Erro ao deletar usuário.", { position: "bottom-right" });
                    console.error(err);
                } finally {
                    setLoading(false); // Finaliza o carregamento
                }
            }
        });
    };

    const handleSave = async () => {
        setLoading(true); // Inicia o carregamento
        try {
            const token = localStorage.getItem("authToken");
            if (selectedPaciente) {
                await axios.put(
                    `https://sistema.clinicamultihabilit.com.br/api/pacientes/${selectedPaciente.id}`,
                    selectedPaciente,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
            if (selectedPaciente) {
                setPacientes((prevPacientes: any) =>
                    prevPacientes.map((paciente: any) =>
                        paciente.id === selectedPaciente.id ? selectedPaciente : paciente
                    )
                );
            }
            toast.success("Usuário atualizado com sucesso!", { position: "bottom-right" });
            setIsEditing(false);
            setModalIsOpen(false);
        } catch (err) {
            toast.error("Erro ao atualizar usuário.", { position: "bottom-right" });
            console.error(err);
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    const handleEditToggle = () => {
        console.log(selectedPaciente)
        setIsEditing(!isEditing);
    };

    const columns = [
        {
            name: "Nome Completo",
            selector: (row: any) => row.usuario.nome_completo,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row: any) => row.usuario.email,
            sortable: true,
        },
        {
            name: "Celular",
            selector: (row: any) => row.usuario.celular,
            sortable: true,
        },
        {
            name: "Ações",
            cell: (row: any) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleViewDetails(row)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        title="Visualizar"
                    >
                        <FaEye />
                    </button>
                    {/* <button
                        onClick={() => handleAddSchedule(row)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        title="Adicionar Horários"
                    >
                        <HiOutlineClock />
                    </button> */}
                    <button
                        onClick={() => handleDeleteUser(row)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        title="Deletar"
                    >
                        <FaTrashCan />
                    </button>
                </div>
            ),
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedPaciente((prevState: any) => ({
            ...prevState,
            usuario: {
                ...prevState.usuario,
                [name]: value,
            },
        }));
    };

    return (
        <div className="bg-white h-screen p-4">
            <h1 className="text-2xl font-semibold text-[#575757] mb-4">Terapeutas</h1>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={pacientes}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    striped
                    responsive
                    noHeader
                />
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                contentLabel="Detalhes do Terapeuta"
            >
                {selectedPaciente && (
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <div className="flex p-2 gap-4">
                                <Input
                                    type="text"
                                    value={selectedPaciente.usuario.nome_completo}
                                    onChange={handleInputChange}
                                    name="nome_completo"
                                    placeholder="Nome Completo"
                                    valueLabel="Nome Completo"
                                    labelWidthValue="w-1/5"
                                    disabled={!isEditing}
                                />
                                <Input
                                    type="text"
                                    value={selectedPaciente.usuario.nome_social}
                                    onChange={handleInputChange}
                                    name="nome_social"
                                    placeholder="Nome Social"
                                    valueLabel="Nome Social"
                                    labelWidthValue="w-1/5"
                                    disabled={!isEditing}
                                />
                                <label className="flex flex-col w-1/7 text-sm">
                                    CPF
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={selectedPaciente.usuario.cpf}
                                        onChange={handleInputChange}
                                        name="cpf"
                                        placeholder="CPF"
                                        className="bg-white border border-gray-300 p-2 rounded-md w-full"
                                        disabled={!isEditing}
                                    />
                                </label>
                                <label className="flex flex-col w-1/7 text-sm">
                                    RG
                                    <InputMask
                                        mask="99.999.999-9"
                                        value={selectedPaciente.usuario.rg}
                                        onChange={handleInputChange}
                                        name="rg"
                                        placeholder="RG"
                                        className="bg-white border border-gray-300 p-2 rounded-md w-full"
                                        disabled={!isEditing}
                                    />
                                </label>
                            </div>
                            <div className="flex p-2 gap-4">
                                <Input
                                    type="email"
                                    value={selectedPaciente.usuario.email}
                                    onChange={handleInputChange}
                                    name="email"
                                    placeholder="E-mail"
                                    valueLabel="E-mail"
                                    labelWidthValue="w-1/5"
                                    disabled={!isEditing}
                                />
                                <Select
                                    value={selectedPaciente.usuario.sexo}
                                    onChange={handleInputChange}
                                    name="sexo"
                                    options={[
                                        { value: "", label: "Selecione uma opção" },
                                        { value: "Masculino", label: "Masculino" },
                                        { value: "Feminino", label: "Feminino" },
                                    ]}
                                    valueLabel="Sexo"
                                    disabled={!isEditing}
                                />
                                <label className="flex flex-col w-1/7 text-sm">
                                    Telefone
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={selectedPaciente.usuario.telefone}
                                        onChange={handleInputChange}
                                        name="telefone"
                                        placeholder="Telefone"
                                        className="bg-white border border-gray-300 p-2 rounded-md w-full"
                                        disabled={!isEditing}
                                    />
                                </label>
                                <label className="flex flex-col w-1/7 text-sm">
                                    Celular
                                    <InputMask
                                        mask="(99) 9 9999-9999"
                                        value={selectedPaciente.usuario.celular}
                                        onChange={handleInputChange}
                                        name="celular"
                                        placeholder="Celular"
                                        className="bg-white border border-gray-300 p-2 rounded-md w-full"
                                        disabled={!isEditing}
                                    />
                                </label>
                                <Input
                                    type="date"
                                    value={selectedPaciente.usuario.data_nascimento}
                                    onChange={handleInputChange}
                                    name="data_nascimento"
                                    placeholder="Nascimento"
                                    valueLabel="Nascimento"
                                    labelWidthValue="w-1/6"
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="flex p-2 gap-4">
                                <Select
                                    value={selectedPaciente.estado_civil}
                                    onChange={handleInputChange}
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
                                    value={selectedPaciente.nome_mae}
                                    onChange={handleInputChange}
                                    name="nome_mae"
                                    placeholder="Nome da Mãe"
                                    valueLabel="Nome da Mãe"
                                    labelWidthValue="w-1/5"
                                />
                                <Input
                                    type="text"
                                    value={selectedPaciente.nome_pai}
                                    onChange={handleInputChange}
                                    name="nome_pai"
                                    placeholder="Nome do Pai"
                                    valueLabel="Nome do Pai"
                                    labelWidthValue="w-1/5"
                                />
                                <Select
                                    value={String(selectedPaciente.preferencial)} // Converte booleano para string para o select
                                    onChange={handleInputChange}
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
                                    value={selectedPaciente.cns}
                                    onChange={handleInputChange}
                                    name="cns"
                                    placeholder="CNS"
                                    valueLabel="CNS/Carteira Plano"
                                    labelWidthValue="w-1/6"
                                />
                            </div>
                            <div className="flex p-2 gap-4">
                                <Input
                                    type="text"
                                    value={selectedPaciente.nome_conjuge}
                                    onChange={handleInputChange}
                                    name="nome_conjuge"
                                    placeholder="Cônjuge"
                                    valueLabel="Cônjuge"
                                    labelWidthValue="w-1/5"
                                />
                                <Select
                                    value={selectedPaciente.cor_raca}
                                    onChange={handleInputChange}
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
                                    value={selectedPaciente.profissao}
                                    onChange={handleInputChange}
                                    name="profissao"
                                    placeholder="Profissão"
                                    valueLabel="Profissão"
                                    labelWidthValue="w-1/6"
                                />
                                <Select
                                    value={selectedPaciente.instrucao}
                                    onChange={handleInputChange}
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
                                    value={selectedPaciente.nacionalidade}
                                    onChange={handleInputChange}
                                    name="nacionalidade"
                                    placeholder="Nacionalidade"
                                    valueLabel="Nacionalidade"
                                    labelWidthValue="w-1/5"
                                />
                            </div>
                            <div className="flex p-2 gap-4">
                                <Select
                                    value={selectedPaciente.tipo_sanguineo}
                                    onChange={handleInputChange}
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
                        </div>
                        <div className="">
                            <button
                                onClick={isEditing ? handleSave : handleEditToggle}
                                className={`text-white px-4 py-2 rounded mt-4 ${isEditing ? 'bg-green-500' : 'bg-yellow-500'}`}
                            >
                                {isEditing ? "Salvar" : "Editar"}
                            </button>
                            <button
                                onClick={() => setModalIsOpen(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default ListagemPacientes