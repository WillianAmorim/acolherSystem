// src/pages/Dashboard/utils/calculateRevenue.ts
import filterAppointments from './filterAppointments';

interface Appointment {
  data_agendada: string; // Ajuste para Date se já for um objeto Date
}

const calculateRevenue = (
  appointments: Appointment[],
  startDate?: string | Date,
  endDate?: string | Date
): number[] => {
  const REVENUE_PER_APPOINTMENT = 65;
  
  // Usa a função tipada filterAppointments
  const monthlyCounts = filterAppointments(appointments, startDate, endDate);

  const currentMonth = new Date().getMonth();
  const lastThreeMonths = [
    (currentMonth - 2 + 12) % 12,
    (currentMonth - 1 + 12) % 12,
    currentMonth,
  ];

  return lastThreeMonths.map(month => monthlyCounts[month] * REVENUE_PER_APPOINTMENT);
};

export default calculateRevenue;
