import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface ChartLineProps {
  data: ChartData<"line">;
}

const ChartLine: React.FC<ChartLineProps> = ({ data }) => (
  <div className="w-full bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4 text-[#575757]">Agendamentos Mensais</h2>
    <div className="relative w-full h-64 md:h-80">
      <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  </div>
);

export default ChartLine;
