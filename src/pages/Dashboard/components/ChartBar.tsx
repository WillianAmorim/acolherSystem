import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface ChartBarProps {
  data: ChartData<"bar">;
}

const ChartBar: React.FC<ChartBarProps> = ({ data }) => (
  <div className="w-full bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4 text-[#575757]">Atendimentos por Convênio</h2>
    <div className="relative w-full h-64 md:h-80">
      <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  </div>
);

export default ChartBar;
