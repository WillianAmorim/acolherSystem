import { Doughnut } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface ChartDoughnutProps {
  data: ChartData<"doughnut">;
}

const ChartDoughnut: React.FC<ChartDoughnutProps> = ({ data }) => (
  <div className="w-full bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4 text-[#575757]">Faturamento dos Últimos 3 Meses (R$)</h2>
    <div className="relative w-full h-64 md:h-80 flex justify-center">
      <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  </div>
);

export default ChartDoughnut;
