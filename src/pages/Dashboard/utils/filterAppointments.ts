// src/pages/Dashboard/utils/filterAppointments.ts

interface Appointment {
  data_agendada: string; // Ou Date, dependendo do formato dos dados
}

const filterAppointments = (
  appointments: Appointment[],
  startDate?: string | Date,
  endDate?: string | Date
): number[] => {
  const monthlyCounts = Array(12).fill(0);

  appointments.forEach((appointment: Appointment) => {
    const appointmentDate = new Date(appointment.data_agendada);
    if (
      (!startDate || appointmentDate >= new Date(startDate)) &&
      (!endDate || appointmentDate <= new Date(endDate))
    ) {
      const month = appointmentDate.getMonth();
      monthlyCounts[month] += 1;
    }
  });

  return monthlyCounts;
};

export default filterAppointments;
