import { FaRegClock } from "react-icons/fa6";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import Modal from "react-modal";
import DataTable from "react-data-table-component";
import Input from "@/components/Input";
import Button from '../../../components/Button'

Modal.setAppElement('#root');

interface CalendarSectionProps {
    agendamentos: any[];
    dataSelecionada: Date | undefined;
    alterarDataAtual: (selectedDate: Date | undefined) => void;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({
    agendamentos,
    dataSelecionada,
    alterarDataAtual,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleModal = () => setIsOpen(!isOpen);

    interface RowData {
        paciente: {
            usuario: {
                nome_completo: string;
            };
        };
        atendente: {
            nome_completo: string;
        };
        medico: {
            usuario: {
                nome_completo: string;
            };
        };
        numero_guia: string | number;
        convenio: {
            procedimentos: string;
            razao_social: string;
        };
    }

    const columns = [
        {
            name: 'Nome',
            selector: (row: RowData) => row.paciente.usuario.nome_completo,
            sortable: true,
        },
        {
            name: 'Atendente',
            selector: (row: RowData) => row.atendente.nome_completo,
            sortable: true,
        },
        {
            name: 'Medico',
            selector: (row: RowData) => row.medico.usuario.nome_completo,
            sortable: true,
        },
        {
            name: 'Guia',
            selector: (row: RowData) => row.numero_guia,
            sortable: true,
        },
        {
            name: 'Procedimento',
            selector: (row: RowData) => row.convenio.procedimentos,
            sortable: true,
        },
        {
            name: 'Convênio',
            selector: (row: RowData) => row.convenio.razao_social,
            sortable: true,
        },
    ];

    const filteredData = agendamentos.filter((item) => {
        const term = searchTerm.toLowerCase();
        return (
            item.paciente.usuario.nome_completo.toLowerCase().includes(term) ||
            item.atendente.nome_completo.toLowerCase().includes(term) ||
            item.medico.usuario.nome_completo.toLowerCase().includes(term) ||
            item.numero_guia.toLowerCase().includes(term) ||
            item.convenio.procedimentos.toLowerCase().includes(term) ||
            item.convenio.razao_social.toLowerCase().includes(term)
        );
    });

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página:',
        rangeSeparatorText: 'de',
        noRowsPerPage: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: 'Todos',
    };

    // const testeClick = () => {
    //     console.log(dataSelecionada)
    //     console.log(agendamentos, 'agendamentos')
    // }

    const formatarData = (date: Date) => {
        const newDate = new Date(date)

        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Mês é zero-based, então adicionamos 1
        const day = String(newDate.getDate()).padStart(2, '0');

        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate
    }

    return (
        <section className="flex flex-col">
            <div>
                <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={dataSelecionada}
                    onSelect={alterarDataAtual}
                    className="rounded-md border bg-white"
                />
            </div>
            <div className="p-2">
                <h1 className="font-bold text-base text-[#575757]">Próximas consultas</h1>
                <div>
                    {agendamentos && dataSelecionada && agendamentos.some(agendamento => formatarData(agendamento.data_agendada) === formatarData(dataSelecionada)) ? (
                        agendamentos
                            .filter(agendamento => dataSelecionada && formatarData(agendamento.data_agendada) === formatarData(dataSelecionada))
                            .sort((a, b) => {
                                const horaA = a.data_agendada?.split(" ")[1] || "00:00";
                                const horaB = b.data_agendada?.split(" ")[1] || "00:00";
                                return horaA.localeCompare(horaB); // Ordena pelo horário (strings de tempo no formato "HH:mm")
                            })
                            .slice(0, 5)
                            .map((agendamento, index) => {
                                const paciente = agendamento?.paciente;
                                const usuarioPaciente = paciente?.usuario;
                                const medico = agendamento?.medico;
                                const usuarioMedico = medico?.usuario;

                                // Defina a classe dinamicamente com base no status
                                const statusClass =
                                    agendamento.status === 0
                                        ? "bg-yellow-200" // Amarelo
                                        : agendamento.status === 1
                                            ? "bg-green-200" // Verde
                                            : "bg-white"; // Padrão (branco)

                                return (
                                    <div
                                        key={index}
                                        className={`py-3 my-3 w-full border px-2 rounded-sm ${statusClass}`}
                                    >
                                        <div className="mb-2">
                                            <h3 className="text-sm font-bold text-[#575757]">
                                                {usuarioPaciente?.nome_completo || "Paciente não informado"}
                                            </h3>
                                            <p className="text-xs text-[blue]">
                                                {agendamento.data_agendada?.split(" ")[0] || "Data não disponível"}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-[blue]">
                                                {usuarioMedico?.nome_completo || "Médico não informado"}
                                            </p>
                                            <div className="flex gap-1 justify-center items-center">
                                                <FaRegClock className="text-[#094D6D]" />
                                                <p className="text-[#094D6D] text-xs font-medium">
                                                    {agendamento.data_agendada?.split(" ")[1] || "Horário não disponível"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                    ) : (
                        <p className="text-center text-gray-500">Nenhum agendamento para esta data.</p>
                    )}


                    <Button onClick={toggleModal}>Ver mais</Button>
                    {/* <button onClick={testeClick}>Testando</button> */}
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={toggleModal}
                        style={{
                            content: {
                                top: "50%",
                                left: "50%",
                                right: "auto",
                                bottom: "auto",
                                marginRight: "-50%",
                                transform: "translate(-50%, -50%)",
                                width: "65%",
                                maxHeight: "80%",
                                overflowY: "auto",
                                zIndex: "99999",
                            },
                            overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
                        }}
                    >
                        <h2 className="text-lg font-bold mb-4">Tabela de Procedimentos</h2>
                        <div>
                            <Input
                                type="text"
                                placeholder="Digite para buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mb-4 w-full px-2 py-1 border rounded"
                                name={""}
                                labelWidthValue={""}
                            />
                        </div>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            paginationComponentOptions={paginationOptions}
                            highlightOnHover
                            conditionalRowStyles={[
                                {
                                    when: (row: any) => row.status === 0, // Condição para "Agendado"
                                    style: {
                                        backgroundColor: "#FFF4BD",
                                    },
                                },
                                {
                                    when: (row: any) => row.status === 1, // Condição para "Confirmado"
                                    style: {
                                        backgroundColor: "#A3EBB1",
                                    },
                                },
                            ]}
                        />
                        <button onClick={toggleModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
                            Fechar
                        </button>
                    </Modal>
                </div>
            </div>
        </section>
    );
};

export default CalendarSection;
