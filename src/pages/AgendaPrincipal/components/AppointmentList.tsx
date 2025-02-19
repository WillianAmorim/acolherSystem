import { useState } from "react";
import ModalContent from "./ModalContent";
import { horariosMarcacao } from "../utils/helpers";

interface AppointmentListProps {
    date: string;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ date }) => {
    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);
    const [modalAgendamentos, setModalAgendamentos] = useState<any[]>([]);

    const openModal = (index: number, agendamentos: any[]) => {
        setOpenModalIndex(index);
        setModalAgendamentos(agendamentos);
    };

    const closeModal = () => {
        setOpenModalIndex(null);
        setModalAgendamentos([]);
    };

    return (
        <section className="border w-full rounded-md">
            <div>
                {horariosMarcacao.map((agendamentoHorario, index) => (
                    <div key={index} className="flex">
                        <div className="border-b border-r w-48 h-20 flex justify-end pr-2 pt-2 text-xs text-foreground">
                            {agendamentoHorario.hora}
                        </div>
                        <div className="border-b w-full flex justify-center items-center">
                            <div
                                onClick={() => openModal(index, agendamentoHorario.agendamentos)}
                                className="flex bg-gray-200 gap-10 p-2 m-2 rounded-md justify-between items-center w-full cursor-pointer active:opacity-60"
                            >
                                <div>
                                    <p className="font-semibold text-sm text-[#575757]">Agendamentos</p>
                                    <p className="text-xs text-foreground">{date}</p>
                                </div>
                                <div className="text-sm text-foreground">
                                    {agendamentoHorario.agendamentos.length} Pacientes
                                </div>
                            </div>
                            <ModalContent
                                isOpen={openModalIndex === index}
                                closeModal={closeModal}
                                agendamentos={modalAgendamentos}
                                onUpdateAgendamentos={setModalAgendamentos} // Atualiza os dados no modal
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AppointmentList;
