import { useAgendamento } from "../hooks/useAgendamento";
import AgendamentoForm from "../components/AgendamentoForm";
import ClipLoader from "react-spinners/ClipLoader";

const Agendamento = () => {
    const { loading } = useAgendamento();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                <ClipLoader color="#3bl7B7" size={60} />
            </div>
        );
    }

    return (
        <div className="p-8 bg-[#FFF] min-h-screen">
            <AgendamentoForm />
        </div>
    );
};

export default Agendamento;
