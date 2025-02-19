import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import ptLocale from '@fullcalendar/core/locales/pt'; // Importa o idioma pt-br
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import Select from 'react-select';
import './CalendarioSemanal.css';

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

const MyWeeklyAgenda = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<{ title: string; start: string }[]>([]); // Estado para armazenar os eventos
    const [selectedDay, setSelectedDay] = useState(null);
    const [eventsForSelectedDay, setEventsForSelectedDay] = useState<{ title: string; start: string }[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState('dayGridMonth'); // Estado para a visualização atual
    const [selectedOption, setSelectedOption] = useState(null);
    const [agendamentos, setAgendamentos] = useState<{ id: number; paciente: { usuario: { nome_completo: string } }; medico: { usuario: { nome_completo: string } }; data_agendada: string }[]>([])
    const [selectCategoria, setSelectCategoria] = useState<{
        label: string; options: {
            label: any; value: number; data: string
        }[]
    }[]>([])
    const [selectedTerapeutaOrPaciente, setSelectedTerapeutaOrPaciente] = useState<Option | null>(null)


    interface Option {
        value: string;
        label: string;
    }

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const { data: getAllAgendamentos } = await axios.get(
                    "https://sistema.clinicamultihabilit.com.br/api/agendamentos",
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setAgendamentos(getAllAgendamentos.original)

                const formattedEvents = getAllAgendamentos.original.map((event: { data_agendada: string; }) => ({
                    title: 'Agendamento',
                    start: `${event.data_agendada.split(' ')[0]}T${event.data_agendada.split(' ')[1]}`,
                }));

                setEvents(formattedEvents);
            } catch (err) {
                console.error(err);
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    toast.error('Erro ao carregar agendamentos', {
                        position: 'bottom-right',
                    });
                    navigate('/login');
                }
                toast.error("Erro ao carregar dados.", { position: "bottom-right" });
            }
        };

        fetchUsuarios();
    }, [navigate]);

    // Função chamada quando o botão "Ver mais" é clicado
    const handleViewMoreClick = (selectedDate: any) => {
        setSelectedDay(selectedDate);

        // Filtra os eventos para o dia clicado
        const eventsForDay = events.filter(event =>
            event.start.startsWith(selectedDate)
        );

        setEventsForSelectedDay(eventsForDay);
        setIsModalOpen(true);  // Abre o modal
    };

    // Customização para adicionar o botão "Ver mais"
    const renderDayCell = (args: any) => {
        const date = args.date;
        const dateString = date.toISOString().split('T')[0]; // Pega a data no formato YYYY-MM-DD

        // Verifica se estamos na visualização mensal antes de exibir o botão "Ver mais"
        if (currentView !== 'dayGridMonth') {
            return <div>{args.dayNumberText}</div>;
        }

        // Filtra os eventos para o dia da célula atual
        const eventsForDay = events.filter(event => event.start.startsWith(dateString));

        return (
            <div>
                <div className=''>{args.dayNumberText}</div> {/* Exibe o número do dia */}
                {eventsForDay.length > 0 && (
                    <button className='bg-orange-200 rounded-md p-2' onClick={() => handleViewMoreClick(dateString)}>Ver mais</button>
                )}
            </div>
        );
    };

    const options = [
        { value: '', label: 'selecione uma opção' },
        { value: 'terapeuta', label: 'Terapeuta' },
        { value: 'paciente', label: 'Paciente' }
    ];

    const selecionarTerapeutaOuPaciente = (selectedOption: any) => {
        setSelectedOption(selectedOption);

        if (selectedOption.value === 'paciente') {
            setSelectCategoria([]);

            // Mapeia os agendamentos para um formato mais simples
            const filtroDeAgendamentos = agendamentos.map((agendamento) => {
                return {
                    value: agendamento.id,
                    label: agendamento.paciente.usuario.nome_completo,
                    data: agendamento.data_agendada,
                };
            });

            // Usando reduce para agrupar os agendamentos por label
            const agrupadoPorLabel = filtroDeAgendamentos.reduce((acc: { [key: string]: { value: number; data: string, label: string }[] }, agendamento) => {
                if (!acc[agendamento.label]) {
                    acc[agendamento.label] = []; // Cria a chave para a label, se ainda não existir
                }
                acc[agendamento.label].push({
                    value: agendamento.value,
                    data: agendamento.data,
                    label: agendamento.label,
                });
                return acc;
            }, {});

            // console.log(agrupadoPorLabel, 'agendamentos agrupados por label');

            // Se você precisar de uma lista ordenada de todas as opções
            const selectCategoriaOrdenada = Object.keys(agrupadoPorLabel)
                .sort() // Ordena as labels (alfabeticamente)
                .map((label) => ({
                    label,
                    options: agrupadoPorLabel[label], // Pega as opções para cada label
                }));

            // console.log(selectCategoriaOrdenada, 'agendamentos agrupados e ordenados');
            setSelectCategoria(selectCategoriaOrdenada);
        }

        if (selectedOption.value === 'terapeuta') {
            setSelectCategoria([]);

            // Mapeia os agendamentos para um formato mais simples
            const filtroDeAgendamentos = agendamentos.map((agendamento) => {
                return {
                    value: agendamento.id,
                    label: agendamento.medico.usuario.nome_completo,
                    data: agendamento.data_agendada,
                };
            });

            // Usando reduce para agrupar os agendamentos por label
            const agrupadoPorLabel = filtroDeAgendamentos.reduce((acc: { [key: string]: { value: number; data: string, label: string }[] }, agendamento) => {
                console.log(agendamento, 'agendamento')
                if (!acc[agendamento.label]) {
                    acc[agendamento.label] = []; // Cria a chave para a label, se ainda não existir
                }
                acc[agendamento.label].push({
                    value: agendamento.value,
                    data: agendamento.data,
                    label: agendamento.label,
                });
                return acc;
            }, {});

            console.log(agrupadoPorLabel, 'agendamentos agrupados por label');

            // Se você precisar de uma lista ordenada de todas as opções
            const selectCategoriaOrdenada = Object.keys(agrupadoPorLabel)
                .sort() // Ordena as labels (alfabeticamente)
                .map((label) => ({
                    label,
                    options: agrupadoPorLabel[label], // Pega as opções para cada label
                }));

            console.log(selectCategoriaOrdenada, 'agendamentos agrupados e ordenados');
            setSelectCategoria(selectCategoriaOrdenada);
        }
    };

    const segundoSelect = (selectedOption: any) => {
        // console.log(selectedOption.label, 'teste demais')
        // console.log(selectCategoria, 'selectCategoria')
        setSelectedTerapeutaOrPaciente(selectedOption as Option);  // Atualize o estado com a opção selecionada

        const filterData = selectCategoria.filter(item => item.label === selectedOption.label)

        // console.log(filterData, 'filterData')

        // const formattedEvents = filterData[0].options.map(event => ({
        //     title: 'Agendamento',
        //     start: `${event.data.split(' ')[0]}T${event.data.split(' ')[1]}`,
        // }));

        const formattedEvents = filterData[0].options.map(event => {
            console.log("Evento atual:", event); // Exibe o objeto event no console
            return {
                title: `${event.label}`,
                start: `${event.data.split(' ')[0]}T${event.data.split(' ')[1]}`,
            };
        });

        console.log(formattedEvents, 'formattedEvents')

        setEvents(formattedEvents);

    };

    return (
        <div className='bg-white'>
            <div className='pl-5'>
                <h1 className='text-2xl font-semibold text-[#575757]'>Filtros</h1>
                <div className='flex mb-5 gap-5 pl-5 pt-2'>
                    <Select
                        value={selectedOption}  // Valor selecionado
                        onChange={selecionarTerapeutaOuPaciente}  // Função que é chamada quando o valor muda
                        options={options}        // Opções para o select
                        placeholder="Escolha uma opção"  // Texto que aparece quando nada está selecionado
                        styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 1050 }), // Configura o z-index alto
                        }}
                        menuPortalTarget={document.body}
                        className='w-1/4'
                    />

                    {selectCategoria &&
                        <Select<Option>
                            value={selectedTerapeutaOrPaciente}  // Certifique-se de que também corresponde ao tipo Option
                            onChange={(option) => segundoSelect(option as Option)}  // Cast opcional
                            options={selectCategoria.map(categoria => ({
                                value: categoria.label,  // A chave 'value' será o nome do paciente
                                label: categoria.label    // A chave 'label' será o nome do paciente
                            }))}
                            placeholder="Escolha uma opção"
                            styles={{
                                menuPortal: (base) => ({ ...base, zIndex: 1050 }),
                            }}
                            menuPortalTarget={document.body}
                            className='w-1/4'
                        />

                    }
                </div>
                {/* <button onClick={filtrarAgendamentos}>Filtrar</button> */}
            </div>
            <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin]}
                initialView="timeGridWeek"
                locale={ptLocale}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridDay,timeGridWeek,dayGridMonth'
                }}
                events={events}
                dayCellContent={renderDayCell}  // Customiza as células do calendário para adicionar o botão
                viewDidMount={(arg) => setCurrentView(arg.view.type)}  // Atualiza a visualização quando o calendário for montado
                // viewDidUpdate={(arg) => setCurrentView(arg.view.type)}  // Atualiza a visualização quando o calendário for atualizado
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false
                }}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false
                }}
                businessHours={{
                    daysOfWeek: [1, 2, 3, 4, 5],
                    startTime: '08:00',
                    endTime: '18:50'
                }}
                slotMinTime="08:00:00"
                slotMaxTime="18:50:00"
                slotDuration="00:50:00"
                hiddenDays={[0]}  // Remove o domingo (0 representa domingo)
                height="auto"
                contentHeight="auto"
            />

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Eventos do Dia"
                style={customStyles}
            >
                <h2>Eventos do dia {selectedDay}</h2>
                <ul>
                    {eventsForSelectedDay.length > 0 ? (
                        eventsForSelectedDay.map((event, index) => (
                            <li key={index}>
                                {event.title} - {new Date(event.start).toLocaleTimeString()}
                            </li>
                        ))
                    ) : (
                        <p>Não há eventos para este dia.</p>
                    )}
                </ul>
                <button onClick={() => setIsModalOpen(false)}>Fechar</button>
            </Modal>

            <style>
                {`
                    .fc-timegrid-slot {
                        height: 50px !important; /* Ajuste conforme necessário */
                    }
                `}
            </style>
        </div>
    );
};

export default MyWeeklyAgenda;
