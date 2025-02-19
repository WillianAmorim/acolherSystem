// import * as React from "react";
// import { Calendar } from "@/components/ui/calendar";
// import { ptBR } from 'date-fns/locale';
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"


// const Agenda = () => {
//     const currentDate = new Date();
//     const [date, setDate] = React.useState<Date>(currentDate);

//     // Inicializando os horários com visibilidade individual
//     // const [horarios, setHorarios] = React.useState([
//     //     { hora: "8:00", visivel: false },
//     //     { hora: "8:30", visivel: false },
//     //     { hora: "9:00", visivel: false },
//     //     { hora: "9:30", visivel: false },
//     //     { hora: "10:00", visivel: false },
//     //     { hora: "10:30", visivel: false },
//     //     { hora: "11:00", visivel: false },
//     //     { hora: "11:30", visivel: false },
//     //     { hora: "12:00", visivel: false }
//     // ]);

//     const [dateInfo, setDateInfo] = React.useState<{
//         day: number;
//         monthName: string;
//         year: number;
//         weekDayName: string;
//     }>({
//         day: currentDate.getDate(),
//         monthName: [
//             "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
//             "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
//         ][currentDate.getMonth()],
//         year: currentDate.getFullYear(),
//         weekDayName: [
//             "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
//         ][currentDate.getDay()],
//     });

//     const handleDateClick = (selectedDate: Date | undefined) => {
//         if (selectedDate) {
//             setDate(selectedDate);
//             const day = selectedDate.getDate();
//             const month = selectedDate.getMonth();
//             const year = selectedDate.getFullYear();
//             const weekDayNumber = selectedDate.getDay();
//             const weekDays = [
//                 "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
//             ];
//             const weekDayName = weekDays[weekDayNumber];
//             const months = [
//                 "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
//                 "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
//             ];
//             const monthName = months[month];
//             setDateInfo({ day, monthName, year, weekDayName });
//         }
//     };

//     return (
//         <div className="flex bg-customGray w-full">
//             <section className="w-full p-2">
//                 <label htmlFor="" className="flex flex-col">
//                     Selecione o profissional
//                     <input type="text" placeholder="Todos os profissionais" className="max-w-min" />
//                 </label>
//                 <div className="flex justify-between">
//                     <div className="text-blue-500">{`${dateInfo.weekDayName}, ${dateInfo.day} de ${dateInfo.monthName} de ${dateInfo.year}`}</div>
//                     <div className="flex gap-4">
//                         <p>Hoje</p>
//                         <p>Dia</p>
//                         <p>Semana</p>
//                         <p>Mês</p>
//                         <p>Lista Semanal</p>
//                     </div>
//                 </div>

//                 <section className="bg-white flex justify-between">
//                     <ul className="flex flex-col gap-1 w-[100%]">
//                         {horarios.map((item, index) => (
//                             <li key={index} className="flex">
//                                 <Accordion type="single" collapsible className="bg-red-400 w-full">
//                                     <AccordionItem value="item-1">
//                                         <AccordionTrigger className="bg-blue-200 p-4">{item.hora}</AccordionTrigger>
//                                         {[...Array(5)].map((_, i) => (
//                                             <li className="">
//                                                 <AccordionContent className="p-4">
//                                                     Paciente Erick Consulta (Dr. Pedro)
//                                                 </AccordionContent>
//                                                 <hr />
//                                             </li>
//                                         ))}
//                                         {/* <AccordionContent>
//                                         Paciente Erick Consulta (Dr. Pedro)
//                                         </AccordionContent> */}
//                                     </AccordionItem>
//                                 </Accordion>
//                                 {/* <div className="min-w-24 bg-blue-500 p-2 text-white flex justify-center items-center h-12">{item.hora}</div>
//                                 <ul className="flex flex-col w-full">
//                                     <div
//                                         className="flex justify-center items-center w-full p-2 bg-slate-400 h-12 cursor-pointer"
//                                         onClick={() => toggleVisibilidade(index)}
//                                     >
//                                         {item.visivel ? <LuChevronUp /> : <LuChevronDown />}
//                                     </div>
//                                     <div
//                                         className={`transition-all duration-500 ease-in-out overflow-hidden 
//                                             ${item.visivel ? 'h-auto opacity-100' : 'h-0 opacity-0'} 
//                                             flex-col bg-yellow-200`}
//                                     >
//                                         {[...Array(5)].map((_, i) => (
//                                             <li key={i}>Paciente Erick Consulta (Dr. Pedro)</li>
//                                         ))}
//                                     </div>
//                                 </ul> */}
//                             </li>
//                         ))}
//                     </ul>
//                     <div>
//                         <Calendar
//                             mode="single"
//                             locale={ptBR}
//                             selected={date}
//                             onSelect={handleDateClick}
//                             className="rounded-md border bg-white"
//                         />
//                     </div>
//                 </section>
//             </section>
//         </div>
//     );
// }

// export default Agenda;
