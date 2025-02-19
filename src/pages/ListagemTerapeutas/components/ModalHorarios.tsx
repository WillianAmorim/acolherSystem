import Modal from 'react-modal';
import { HiPlus } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdDeleteForever } from "react-icons/md";
import Select from "react-select";
import api from "../../../core/http"; 

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '80%',
        zIndex: 1000,
    },
    overlay: {
        zIndex: 999,
    },
};

interface ModalHorariosProps {
    scheduleModalIsOpen: boolean;
    resetStatesModal: () => void;
    selectedTerapeuta: any;
    adicionarHorarios: () => void;
    isVisible: boolean;
}

const ModalHorarios: React.FC<ModalHorariosProps> = ({
    scheduleModalIsOpen,
    resetStatesModal,
    selectedTerapeuta,
    adicionarHorarios,
    isVisible,
}) => {
    const navigate = useNavigate();

    const [horariosSelecionados, setHorarioSelecionado] = useState<string[]>([]);
    const [horarios, setHorarios] = useState<any[]>([]);
    const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);

    const arrayHorariosDisponiveis = [
        "08:00 - 08:50", "08:50 - 09:40", "09:40 - 10:30",
        "10:30 - 11:20", "11:20 - 12:10", "12:10 - 13:00",
        "13:00 - 13:50", "13:50 - 14:40", "14:40 - 15:30",
        "15:30 - 16:20", "16:20 - 17:10", "17:10 - 18:00",
        "18:00 - 18:50",
    ];

    const arrayDiasDaSemana = [
        "segunda-feira", "terca-feira", "quarta-feira",
        "quinta-feira", "sexta-feira","sabado",
    ];

    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const { data: horariosTerapeuta } = await api.get(
                    `/medicos/${selectedTerapeuta.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(horariosTerapeuta.original.horarios)
                // console.log("medico", selectedTerapeuta.id)
                // console.log("horarios", horariosTerapeuta)
                setHorarios(horariosTerapeuta.original.horarios);
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    toast.error('Sessão expirada. Você será redirecionado para o login.', {
                        position: 'bottom-right',
                    });
                    navigate('/login');
                }
                toast.error("Erro ao buscar horários.", { position: "bottom-right" });
            }
        };

        if (selectedTerapeuta) {
            fetchHorarios();
        }
    }, [selectedTerapeuta]);

    // const filtrarHorariosPorTerapeuta = () => {
    //     return horarios.filter(hr => hr.medico.id === selectedTerapeuta.id);
    // };

    const selecionarHorarios = (horario: string) => {
        setHorarioSelecionado((prevHorarios) =>
            prevHorarios.includes(horario)
                ? prevHorarios.filter((item) => item !== horario)
                : [...prevHorarios, horario]
        );
    };

    const handleChange = (selected: { value: string; label: string } | null) => {
        setSelectedOption(selected);
    };

    // const verificarDiaSemana = (dataHora: string) => {
    //     const dataHorario = dataHora.split(' ')[0];
    //     const data = dayjs(dataHorario);

    //     const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    //     return diasDaSemana[data.day()];
    // };

    const requestAddHorarios = async () => {

        if (selectedOption) {
            const objHorarios = horariosSelecionados.map((horarioSelecionado) => ({
                medico_id: selectedTerapeuta.id,
                horario: `${horarioSelecionado.split(" ")[0]}:00`,
                dia_semana: selectedOption.value
            }));
            console.log(objHorarios)

            try {
                await api.post(
                    '/horarios',
                    { 'horarios': objHorarios }
                );

                // Após adicionar, buscar os horários atualizados
                const token = localStorage.getItem("authToken");
                const { data: horariosAtualizados } = await api.get(
                    `/medicos/${selectedTerapeuta.id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                console.log("horario atuazliado:",horariosAtualizados)

                setHorarios(horariosAtualizados.original.horarios); // Atualizar os horários na tela
                toast.success("Horário cadastrado!", { position: "bottom-right" });
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    toast.error('Sessão expirada. Você será redirecionado para o login.', {
                        position: 'bottom-right',
                    });
                    navigate('/login');
                } else {
                    toast.error("Não foi possível adicionar horário", { position: "bottom-right" });
                }
                console.error("Erro ao adicionar horários:", err);
            }
        }


        setHorarioSelecionado([]);
    };



    const removerHorario = async (horarioRemovido: any) => {
        const confirmacao = await Swal.fire({
            title: 'Confirmação de Exclusão',
            text: 'Tem certeza que deseja excluir este horário?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Não, cancelar'
        });

        if (confirmacao.isConfirmed) {
            try {
                const token = localStorage.getItem("authToken");
                await api.delete(`/horarios/${horarioRemovido.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setHorarios((prevHorarios) =>
                    prevHorarios.filter((hr) => hr.id !== horarioRemovido.id)
                );
                toast.success("Horário removido com sucesso!");
            } catch (err) {
                toast.error("Erro ao remover horário.");
            }
        } else {
            toast.info("A exclusão foi cancelada.");
        }
    };

    const options = [
        { value: "segunda-feira", label: "Segunda-Feira" },
        { value: "terca-feira", label: "Terça-Feira" },
        { value: "quarta-feira", label: "Quarta-Feira" },
        { value: "quinta-feira", label: "Quinta-Feira" },
        { value: "sexta-feira", label: "Sexta-Feira" },
        { value: "sabado", label: "Sábado" },
    ];

    return (
        <Modal
            isOpen={scheduleModalIsOpen}
            onRequestClose={resetStatesModal}
            style={customStyles}
            contentLabel="Horários do Terapeuta"
        >
            {selectedTerapeuta && (
                <div className="h-full overflow-hidden">
                    <div className="flex justify-center items-center">
                        <h2 className="text-2xl flex justify-center">Horários do Terapeuta</h2>

                        <button
                            onClick={adicionarHorarios}
                            className="bg-blue-500 text-white rounded absolute right-4"
                            title="Adicionar horário"
                        >
                            <HiPlus size={25} color="white" />
                        </button>
                    </div>
                    <div className={`flex flex-col p-2 mt-4  ${isVisible ? 'block' : 'hidden'}`}>
                        <div className="flex gap-4 justify-start w-4/5">
                            <div>
                                <label htmlFor="">
                                    Selecione um dia
                                </label>
                                <Select
                                    options={options}
                                    value={selectedOption}
                                    onChange={handleChange}
                                    placeholder="Selecione..."
                                />
                            </div>
                            <section>
                                <div className='flex gap-2 flex-wrap cursor-pointer'>
                                    {arrayHorariosDisponiveis.map((horarioDisponivel, index) => (
                                        <div key={index} onClick={() => selecionarHorarios(horarioDisponivel)}>
                                            <p
                                                className={`${horariosSelecionados.includes(horarioDisponivel)
                                                    ? 'bg-blue-300 text-[#FFF]'
                                                    : 'border border-blue-500 text-blue-300'
                                                    } border border-blue-300 p-2 rounded-md min-w-max`}
                                            >
                                                {horarioDisponivel}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                        <button
                            onClick={requestAddHorarios}
                            className="bg-green-300 py-2 px-3 text-[#FFF] rounded-md max-h-min max-w-min">Adicionar
                        </button>
                    </div>
                    <div className="flex flex-col mt-6 h-[100%] overflow-y-auto">
                        <div className="flex flex-col gap-2 bg-gray-500 p-2 rounded-md">
                            {arrayDiasDaSemana.map((diaSemana) => (
                                <div className="flex h-full" key={diaSemana}>
                                    <div className="bg-red-200 flex items-center justify-center p-2 min-w-max w-1/5">
                                        {diaSemana}
                                    </div>
                                    <div className="flex flex-wrap gap-2 bg-purple-300 w-4/5">
                                        {horarios.map((hr) => {
                                            //const diaDaSemana = verificarDiaSemana(hr.data_hora_inicial);

                                            if (hr.dia_semana === diaSemana) {
                                                return (
                                                    <div key={hr.id} className="flex gap-2 bg-green-200 p-2 rounded-md items-center">
                                                        <p>{hr.horario}</p>
                                                        <button onClick={() => removerHorario(hr)}><MdDeleteForever /></button>
                                                    </div>
                                                );
                                            }

                                            return null;
                                        })}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    <div className="fixed bottom-4 right-12 z-10">
                        <button
                            onClick={resetStatesModal}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ModalHorarios;
