import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { useState } from "react";
import { handleConfirmAppointment, handleCancelAppointment } from "../utils/helpers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ModalContentProps {
    isOpen: boolean;
    closeModal: () => void;
    agendamentos: any[];
    onUpdateAgendamentos: (updatedAgendamentos: any[]) => void;
}

const ModalContent: React.FC<ModalContentProps> = ({
    isOpen,
    closeModal,
    agendamentos,
    onUpdateAgendamentos,
}) => {
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
    const [selectedAgendamento, setSelectedAgendamento] = useState<any | null>(null);
    const [estadoDoAgendamento, setEstadoDoAgendamento] = useState('none')
    const navigate = useNavigate(); // Adicionado para corrigir o erro

    const openConfirmModal = (agendamento: any) => {
        setSelectedAgendamento(agendamento);
        setConfirmModalIsOpen(true);
    };

    const closeConfirmModal = () => {
        setSelectedAgendamento(null);
        setConfirmModalIsOpen(false);
    };

    const handleDesmarcar = async () => {
        if (selectedAgendamento) {
            try {
                await handleCancelAppointment(selectedAgendamento, navigate);
                const updatedAgendamentos = agendamentos.filter(
                    (agendamento) => agendamento.id !== selectedAgendamento.id
                );
                onUpdateAgendamentos(updatedAgendamentos);
                toast.success("Agendamento desmarcado com sucesso!", { position: "bottom-right" });
            } catch (error) {
                toast.error("Erro ao desmarcar o agendamento.", { position: "bottom-right" });
                console.error(error);
            }
        }
        closeConfirmModal();
    };

    const confirmAppointment = async (row: { id: number; }) => {
        console.log(row, 'row')
        setEstadoDoAgendamento('green')

        await handleConfirmAppointment(row, navigate)
        const updatedAgendamentos = agendamentos.map((agendamento) =>
            agendamento.id === row.id ? { ...agendamento, status: 1 } : agendamento
        );
        onUpdateAgendamentos(updatedAgendamentos);

    }

    const colunas = [
        {
            name: "Nome do Paciente",
            selector: (row: any) => row.paciente.usuario.nome_completo || "Não informado",
            sortable: true,
        },
        {
            name: "Médico",
            selector: (row: any) => row.medico.usuario.nome_completo,
            sortable: true,
        },
        {
            name: "Atendente",
            selector: (row: any) => row.atendente.nome_completo,
        },
        {
            name: "Status",
            selector: (row: any) =>
                row.status === 0 ? "Agendado" : row.status === 1 ? "Confirmado" : "Cancelado",
        },
        {
            name: "Confirmar",
            cell: (row: any) =>
                row.status !== 1 ? (
                    // <button
                    //     onClick={async () => {
                    //         await handleConfirmAppointment(row, navigate); // Corrigido
                    //         const updatedAgendamentos = agendamentos.map((agendamento) =>
                    //             agendamento.id === row.id ? { ...agendamento, status: 1 } : agendamento
                    //         );
                    //         onUpdateAgendamentos(updatedAgendamentos);
                    //     }}
                    //     className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                    // >
                    //     <i className="fas fa-check"></i>
                    // </button>
                    <button onClick={() => confirmAppointment(row)} className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                        <i className="fas fa-check"></i>
                    </button>
                ) : null,
            ignoreRowClick: true,
        },
        {
            name: "Desmarcar",
            cell: (row: any) => (
                <button
                    onClick={() => openConfirmModal(row)}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                >
                    <i className="fas fa-times"></i>
                </button>
            ),
            ignoreRowClick: true,
        },
    ];

    const paginationOptions = {
        rowsPerPageText: "Linhas por página:",
        rangeSeparatorText: "de",
        noRowsPerPage: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: "Todos",
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                contentLabel="Detalhes do Agendamento"
                className="bg-white p-6 rounded shadow-lg mx-auto mt-20 w-[90%] h-[80%]"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
            >
                <DataTable
                    columns={colunas}
                    data={agendamentos}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    highlightOnHover
                    pointerOnHover
                    noDataComponent="Nenhum médico encontrado."
                    conditionalRowStyles={[
                        {
                            when: (row: any) => row.status === 0,
                            style: {
                                backgroundColor: "#FFF4BD",
                            },
                        },
                        {
                            when: () => estadoDoAgendamento === 'green',
                            style: {
                                backgroundColor: "#A3EBB1",
                            },
                        },
                    ]}
                    className="border border-gray-200 rounded-md max-h-[70%] overflow-auto"
                />
                <button
                    onClick={closeModal}
                    className="bg-[#F7665E] text-white px-4 py-2 rounded mt-4"
                >
                    Fechar
                </button>
            </Modal>

            <Modal
                isOpen={confirmModalIsOpen}
                onRequestClose={closeConfirmModal}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                contentLabel="Confirmação de Desmarcação"
                className="bg-white p-6 rounded shadow-lg mx-auto mt-20 w-[40%]"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
            >
                <h2 className="text-xl font-semibold mb-4">Confirmar Desmarcação</h2>
                <p className="mb-4">
                    Tem certeza de que deseja desmarcar o agendamento para{" "}
                    <strong>{selectedAgendamento?.paciente.usuario.nome_completo}</strong>?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={closeConfirmModal}
                        className="bg-gray-300 text-black px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleDesmarcar}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Confirmar
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default ModalContent;
