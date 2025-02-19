import ClipLoader from "react-spinners/ClipLoader";
import {
  Chart,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartLine from "./components/ChartLine";
import ChartDoughnut from "./components/ChartDoughnut";
import ChartBar from "./components/ChartBar";
import Card from "./components/Card";
import useDashboardData, { Appointment } from "./hooks/useDashboardData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";


import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

interface ChamadaCriadaEvent {
  mensagem: string;
}

Chart.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { data, loading, error, chartData, doughnutData, barData, monthlyAppointments } =
    useDashboardData();

  // Função para converter texto em fala
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR"; // Define o idioma
      utterance.rate = 0.5; // Velocidade normal
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("O navegador não suporta a funcionalidade de texto para fala.");
    }
  };

  useEffect(() => {
    // Configurar Laravel Echo
    const echo = new Echo({
      broadcaster: "reverb",
      key: "local",
      wsHost: "147.79.81.67",
      wsPort: 8090,
      forceTLS: false,
      disableStats: true,
    });

    // Ouvir mensagens no canal "fila-chamada"
    echo.channel("fila-chamada") // Nome do canal configurado no broadcastOn()
      .listen("ChamadaCriada", (event: ChamadaCriadaEvent) => {
        console.log("Mensagem recebida via WebSocket:", event);
        // Ler a mensagem em voz alta
        speakText(event.mensagem);
      });

    // Cleanup na desmontagem do componente
    return () => {
      echo.disconnect();
    };
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const getUserName = () => {
    try {
      const user = localStorage.getItem("usuarioLogado");
      if (user) {
        const parsedUser = JSON.parse(user);
        return parsedUser?.nome_completo || "Usuário";
      }
    } catch (e) {
      console.error("Erro ao obter o usuário do localStorage", e);
    }
    return "Usuário";
  };

  const recentAppointments: Appointment[] = monthlyAppointments
    .filter((a) => a.id && a.data_agendada)
    .sort(
      (a, b) =>
        new Date(b.data_agendada).getTime() - new Date(a.data_agendada).getTime()
    )
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <ClipLoader color="#3B7B7B" size={60} />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="bg-[#FFF] min-h-screen">
      <main className="flex-1 p-6 space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-medium text-[#575757]">
            {getGreeting()}, {getUserName()}!
          </h1>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Agendamentos"
            icon="fa-solid fa-calendar-check text-4xl text-[#084E6F] bg-white px-4"
            value={data.agendamento}
          />
          <Card
            title="Pacientes"
            icon="fa-solid fa-hospital-user text-4xl text-[#084E6F] bg-white px-4"
            value={data.pacientes}
          />
          <Card
            title="Terapeutas"
            icon="fa-solid fa-user-doctor text-4xl text-[#084E6F] bg-white px-4"
            value={data.medicos}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartLine data={chartData} />
          <ChartDoughnut data={doughnutData} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartBar data={barData} />
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-[#575757]">Últimos Agendamentos</h2>
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">Data Agendada</th>
                  <th className="py-2 px-4 border">Médico</th>
                  <th className="py-2 px-4 border">Paciente</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="py-2 px-4 border">
                      {new Date(appointment.data_agendada).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border">
                      {appointment.medico?.usuario?.nome_completo || "Não informado"}
                    </td>
                    <td className="py-2 px-4 border">
                      {appointment.paciente?.usuario?.nome_completo || "Não informado"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <ToastContainer />
      </main>
    </div>
  );
};

export default Dashboard;
