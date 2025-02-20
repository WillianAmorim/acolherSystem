import { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { obterDataAtual, filtrarAgendamentos } from "./utils/helpers";
import CalendarSection from "./components/CalendarSection";
import AppointmentList from "./components/AppointmentList";
import { useNavigate } from 'react-router-dom';
import Button from "@/components/Button";


const Agenda = () => {
    const navigate = useNavigate();
    const dataAtual = obterDataAtual();
    const [agendamentos, setAgendamentos] = useState([]);
    const [date, setDate] = useState(dataAtual.dataFormatada);
    const [dataSelecionada, setDataSelecionada] = useState(dataAtual.data);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgendamentos = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("authToken");
                const { data: agendamentosRequest } = await axios.get(
                    "https://sistema.clinicaacolherslz.com.br/api/agendamentos",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setAgendamentos(agendamentosRequest.original);
                filtrarAgendamentos(dataAtual.dataFormatada, agendamentosRequest.original);
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    toast.error('Sessão expirada. Você será redirecionado para o login.', {
                        position: 'bottom-right',
                    });
                    navigate('/login');
                }
                toast.error("Erro ao buscar agendamentos.", { position: "bottom-right" });
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAgendamentos();
    }, []);

    const alterarDataAtual = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            const dia = String(selectedDate.getDate()).padStart(2, "0");
            const mes = String(selectedDate.getMonth() + 1).padStart(2, "0");
            const ano = selectedDate.getFullYear();
            const dataFormatada = `${ano}-${mes}-${dia}`;

            setDataSelecionada(selectedDate);
            setDate(dataFormatada);

            // Passa os agendamentos ao filtrar
            filtrarAgendamentos(dataFormatada, agendamentos);
        }
    };


    return (
        <div className="flex flex-col">
            {loading ? (
                <div className="flex justify-center items-center h-screen bg-white">
                    <ClipLoader color="#3bl7B7" size={60} />
                </div>
            ) : (
                <>

                    <div className="flex justify-end pr-5 bg-white">
                        <div className="flex flex-1 gap-3 justify-start items-center w-full px-5">
                            {/* <i className="fa-regular fa-calendar-check"></i> */}
                            <p className="text-2xl text-[#575757]">Agendamentos</p>
                        </div>
                        <Link to={"/agendamento"}>
                            <Button>Novo agendamento</Button>
                        </Link>
                    </div>
                    <section className="bg-white flex w-full gap-5 p-4">
                        <CalendarSection
                            agendamentos={agendamentos}
                            dataSelecionada={dataSelecionada}
                            alterarDataAtual={alterarDataAtual}
                        />
                        <AppointmentList date={date} />
                    </section>
                </>
            )}
        </div>
    );
};

export default Agenda;
