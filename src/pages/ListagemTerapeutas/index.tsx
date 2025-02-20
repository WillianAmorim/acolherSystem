import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi2";
import { FaTrashCan } from "react-icons/fa6";
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import ModalInputs from "./components/ModalInputs";
import ModalHorarios from "./components/ModalHorarios";
import Modal from 'react-modal';
import Input from "@/components/Input";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%', // Ajuste a largura do modal
        height: '40%', // Ajuste a altura do modal
        zIndex: 1000, // Ajuste o z-index para garantir que o modal fique acima da sidebar
    },
    overlay: {
        zIndex: 999, // Ajuste o z-index do overlay para garantir que ele fique acima da sidebar
    },
};

const ListagemTerapeutas = () => {
    const navigate = useNavigate();

    const [selectedDateDelete, setSelectedDateDelete] = useState<string>('')
    const [motivoDateDelete, setMotivoDateDelete] = useState<string>()

    interface Usuario {
        rg: string | number | readonly string[] | undefined;
        data_nascimento: string;
        telefone: string | number | readonly string[] | undefined;
        sexo: string;
        cpf: string | number | readonly string[] | undefined;
        nome_social: string;
        nome_completo: string;
        email: string;
        celular: string;
    }

    interface Terapeuta {
        carga_horaria: string;
        regime_trabalhista: string;
        id: number;
        usuario: Usuario;
    }

    const [terapeutas, setTerapeutas] = useState<Terapeuta[]>([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [scheduleModalIsOpen, setScheduleModalIsOpen] = useState(false);
    const [selectedTerapeuta, setSelectedTerapeuta] = useState<Terapeuta | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [isVisible, setIsVisible] = useState(false);
    const [openModalDeleteDay, setOpenModalDeleteDay] = useState(false)

    useEffect(() => {
        const fetchTerapeutas = async () => {
            setLoading(true); // Inicia o carregamento
            try {
                const token = localStorage.getItem("authToken");
                const { data: terapeutas } = await axios.get(
                    "https://sistema.clinicaacolherslz.com.br/api/medicos",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setTerapeutas(terapeutas.original);
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    toast.error('Sessão expirada. Você será redirecionado para o login.', {
                        position: 'bottom-right',
                    });
                    navigate('/login');
                }
                toast.error("Erro ao buscar terapeutas.", { position: "bottom-right" });
                console.error(err);
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchTerapeutas();
    }, [navigate]);

    const handleViewDetails = (terapeuta: any) => {
        setSelectedTerapeuta(terapeuta);
        setModalIsOpen(true);
        setIsEditing(false); // Inicia o modal em modo de somente leitura
        console.log(selectedTerapeuta)
    };

    // const filtrarHorariosPorTerapeuta = (horarios: any, idTerapeuta: number) => {
    //     const horariosFiltrados = horarios.filter((horario: any) => horario.medico_id === idTerapeuta);
    //     setHorariosFiltrados(horariosFiltrados);
    // };

    const handleAddSchedule = async (terapeuta: any) => {
        setIsVisible(true);

        setSelectedTerapeuta(terapeuta);
        setScheduleModalIsOpen(true);
    };

    const handleDeleteUser = async (terapeuta: any) => {
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
                    await axios.delete(`https://sistema.clinicaacolherslz.com.br/api/medicos/${terapeuta.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setTerapeutas(terapeutas.filter((t) => t.id !== terapeuta.id));
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
            if (selectedTerapeuta) {
                await axios.put(
                    `https://sistema.clinicaacolherslz.com.br/api/medicos/${selectedTerapeuta.id}`,
                    selectedTerapeuta,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
            if (selectedTerapeuta) {
                setTerapeutas((prevTerapeutas) =>
                    prevTerapeutas.map((terapeuta) =>
                        terapeuta.id === selectedTerapeuta.id ? selectedTerapeuta : terapeuta
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
                    <button
                        onClick={() => handleAddSchedule(row)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        title="Adicionar Horários"
                    >
                        <HiOutlineClock />
                    </button>
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

    const adicionarHorarios = () => {
        setIsVisible(true);
    }

    const resetStatesModal = () => {
        setScheduleModalIsOpen(false);
        setIsVisible(false);
    }

    const functionOpenModalDeleteDay = () => {
        setOpenModalDeleteDay(true)
    }

    const closeModalDeleteDay = () => {
        setOpenModalDeleteDay(false)
    }

    const resetForm = () => {
        setSelectedDateDelete('')
        setMotivoDateDelete('')
    }

    const fetchRemoverData = async () => {
        const dadosRequest = {
            data: selectedDateDelete,
            observacao: motivoDateDelete
        }

        try {
            console.log(dadosRequest, 'dadosrequest')
            const token = localStorage.getItem("authToken");
            await axios.post("https://sistema.clinicaacolherslz.com.br/api/horarios/adicionar-feriado", { data: selectedDateDelete,
                observacao: motivoDateDelete }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            resetForm();
            toast.success("Agendamento realizado com sucesso!", {
                position: "bottom-right",
                // onClose: () => navigate("/agenda"),
            });
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                toast.error('Sessão expirada. Você será redirecionado para o login.', { position: 'bottom-right' });
                navigate('/login');
            } else if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                Object.keys(errors).forEach((campo) => {
                    errors[campo].forEach((mensagem: string) => {
                        toast.error(mensagem, { position: "bottom-right" });
                    });
                });
            } else {
                toast.error("Erro ao realizar agendamento.", { position: "bottom-right" });
            }
        }
    }

    return (
        <div className="bg-white h-screen p-4">
            <div className="flex mb-4 justify-between pr-6">
                <h1 className="text-2xl font-semibold text-[#575757]">Terapeutas</h1>
                <button onClick={functionOpenModalDeleteDay} className="bg-orange-400 p-2 rounded-md text-[#FFF]">Remover Data</button>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={terapeutas}
                    pagination
                    highlightOnHover
                    pointerOnHover
                    striped
                    responsive
                    noHeader
                />
            )}

            <ModalInputs
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                selectedTerapeuta={selectedTerapeuta}
                setSelectedTerapeuta={setSelectedTerapeuta}
                isEditing={isEditing}
                handleSave={handleSave}
                setIsEditing={setIsEditing}
            />

            {isVisible && (
                <ModalHorarios
                    scheduleModalIsOpen={scheduleModalIsOpen}
                    resetStatesModal={resetStatesModal}
                    selectedTerapeuta={selectedTerapeuta}
                    adicionarHorarios={adicionarHorarios}
                    isVisible={isVisible}
                />
            )}

            <Modal
                isOpen={openModalDeleteDay}
                onRequestClose={closeModalDeleteDay}
                style={customStyles}
                contentLabel="Exemplo de Modal"
            >
                <div className="h-full overflow-hidden">
                    <h3 className="text-2xl font-medium text-[#575757]">Remover Data</h3>
                    <div className="">
                        <div className="flex gap-7 h-full p-10">
                            <Input
                                type="date"
                                value={selectedDateDelete}
                                name="selectedDateDelete"
                                onChange={(e) => setSelectedDateDelete(e.target.value)}
                                placeholder='Selecionar Data'
                                labelWidthValue="w-[30%]"
                                valueLabel="Selecionar Data"
                            />

                            <Input
                                type="text"
                                value={motivoDateDelete}
                                name="motivo/observacao"
                                onChange={(e) => setMotivoDateDelete(e.target.value)}
                                placeholder='Motivo/Observação'
                                labelWidthValue="w-[70%]"
                                valueLabel="Motivo/Observação"
                            />
                        </div>
                        <div className="ml-10 bg-green-300 max-w-min px-4 py-2 rounded text-white">
                            <button onClick={fetchRemoverData}>Salvar</button>
                        </div>

                    </div>

                    <div className="fixed bottom-4 right-12 z-10">
                        <button
                            onClick={closeModalDeleteDay}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Fechar
                        </button>
                    </div>
                </div>


            </Modal>
            <ToastContainer />
        </div>
    );
};

export default ListagemTerapeutas;