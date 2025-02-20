import { useState, useEffect } from "react";
import axios from "axios";
import filterAppointments from "../utils/filterAppointments";
import calculateRevenue from "../utils/calculateRevenue";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

interface Usuario {
  nome_completo: string;
}

interface Medico {
  usuario: Usuario;
}

interface Convenio {
  empresa: string;
}

interface Paciente {
  usuario: Usuario;
}

export interface Appointment {
  id: number;
  data_agendada: string;
  medico?: Medico;
  paciente?: Paciente;
  convenio?: Convenio;
}

const useDashboardData = () => {
  const [data, setData] = useState({
    agendamento: 0,
    medicos: 0,
    pacientes: 0,
  });
  const [monthlyAppointments, setMonthlyAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [appointmentsByConvenio, setAppointmentsByConvenio] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const headers = { Authorization: `Bearer ${token}` };

        const [agendamentoRes, medicosRes, pacientesRes] = await Promise.all([
          axios.get("https://sistema.clinicaacolherslz.com.br/api/agendamentos", { headers }),
          axios.get("https://sistema.clinicaacolherslz.com.br/api/medicos", { headers }),
          axios.get("https://sistema.clinicaacolherslz.com.br/api/pacientes", { headers }),
        ]);

        console.log(agendamentoRes, 'agendamentoRes');

        const agendamentos: Appointment[] = agendamentoRes.data["original"];

        // Contar os atendimentos por convênio
        const convenioCounts = agendamentos.reduce<Record<string, number>>(
          (acc, item) => {
            const convenio = item.convenio?.empresa || "Sem Convênio";
            acc[convenio] = (acc[convenio] || 0) + 1;
            return acc;
          },
          {}
        );

        setData({
          agendamento: agendamentos.length,
          medicos: medicosRes.data["original"].length,
          pacientes: pacientesRes.data["original"].length,
        });

        setMonthlyAppointments(agendamentos);
        setAppointmentsByConvenio(convenioCounts);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          toast.error("Sessão expirada. Você será redirecionado para o login.", {
            position: "bottom-right",
          });
          navigate("/login");
        } else {
          setError("Erro ao carregar os dados!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const chartData = {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    datasets: [
      {
        label: "Agendamentos Mensais",
        data: filterAppointments(monthlyAppointments),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const doughnutData = {
    labels: chartData.labels.slice(-3),
    datasets: [
      {
        label: "Faturamento dos Últimos 3 Meses (R$)",
        data: calculateRevenue(monthlyAppointments),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Dados para o gráfico de barras
  const barData = {
    labels: Object.keys(appointmentsByConvenio), // Nomes dos convênios
    datasets: [
      {
        label: "Atendimentos por Convênio",
        data: Object.values(appointmentsByConvenio), // Quantidade de atendimentos
        backgroundColor: "#36A2EB",
        borderColor: "#2B8CCE",
        borderWidth: 1,
      },
    ],
  };

  return { data, loading, error, chartData, doughnutData, barData, monthlyAppointments };
};

export default useDashboardData;
