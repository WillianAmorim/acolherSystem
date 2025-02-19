import { IoAnalyticsOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { MdMedicalServices } from 'react-icons/md';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegHandshake } from "react-icons/fa";
import { FaUserMd } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { FaCalendarDays } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarProvider,
    SidebarRail,
} from "@/components/ui/sidebar";
import Header from "../Header";
import Logo from "../Logo";

import { Link } from "react-router-dom";
import { useState } from "react";

interface sidebarProps {
    children?: React.ReactNode;
}

export function SidebarMobile({ children }: sidebarProps) {
    const [listPaciente, setListPaciente] = useState(false)
    const [listConvenio, setListConvenio] = useState(false)
    const [listTerapeuta, setListTerapeuta] = useState(false)
    const [listAgenda, setListAgenda] = useState(false)

    const changeRegistrationStatus = (key: string) => {
        if (key === "paciente") {
            setListConvenio(false)
            setListTerapeuta(false)
            setListAgenda(false)
            setListPaciente((prevState) => !prevState);
        } else if (key === "convenio") {
            setListPaciente(false)
            setListTerapeuta(false)
            setListAgenda(false)
            setListConvenio((prevState) => !prevState);
        } else if (key === "terapeuta") {
            setListConvenio(false)
            setListAgenda(false)
            setListPaciente(false)
            setListTerapeuta((prevState) => !prevState)
        } else if (key === 'agenda') {
            setListConvenio(false)
            setListTerapeuta(false)
            setListPaciente(false)
            setListAgenda((prevState) => !prevState)
        }
    };

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader className="bg-[#FFF]  ">
                    <Logo className=" flex justify-start items-start" />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            <Link to={'/dashboard'}>
                                <div className="p-3 flex justify-start gap-5 text-[#57575B] pl-4 hover:bg-[#E0E0E0] items-center">
                                    <IoAnalyticsOutline size={15} />
                                    <p className="text-base">Painel</p>
                                </div>
                            </Link>
                            <Link to={'/agendamento'}>
                                <div className="p-3 flex justify-start gap-5 text-[#57575B] pl-4 hover:bg-[#E0E0E0] items-center">
                                    {/* <FaCalendarDays size={15} /> */}
                                    <FaRegCalendarCheck size={15} />
                                    <p className="text-base">Agendamento</p>
                                </div>
                            </Link>
                            <div>
                                <div onClick={() => changeRegistrationStatus('agenda')} className="flex items-center justify-between pr-6 hover:bg-[#E0E0E0] cursor-pointer">
                                    <div className="p-3 flex justify-start gap-5 text-[#57575B] pl-4  items-center">
                                        <FaCalendarDays size={15} />
                                        {/* <FaRegCalendarCheck size={15} /> */}
                                        <p className="text-base">Agenda</p>
                                    </div>
                                    <MdOutlineKeyboardArrowDown size={20} className={`transform transition-transform duration-700 ${listAgenda ? "rotate-180" : "rotate-0"}`} />
                                </div>
                                <ul className={`pl-10 overflow-hidden transition-all duration-700 ease-in-out ${listAgenda ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                    <Link to={'/agenda-geral'}><li className="p-3 flex justify-start gap-5 text-[#57575B] pl-4  items-center hover:bg-[#E0E0E0]">Agenda Geral</li></Link>
                                    <Link to={"/agenda-semanal"}><li className="p-3 flex justify-start gap-5 text-[#57575B] pl-4  items-center hover:bg-[#E0E0E0]">Agenda Semanal</li></Link>
                                </ul>
                            </div>
                            <div>
                                <div onClick={() => changeRegistrationStatus('paciente')} className="flex items-center justify-between pr-6 hover:bg-[#E0E0E0] cursor-pointer">
                                    <div className="p-3 flex justify-start gap-5 text-[#57575B] pl-4  items-center">
                                        <MdMedicalServices size={15} />
                                        <p className="text-base">Paciente</p>
                                    </div>
                                    <MdOutlineKeyboardArrowDown size={20} className={`transform transition-transform duration-700 ${listPaciente ? "rotate-180" : "rotate-0"}`} />
                                </div>
                                <ul className={`pl-10 overflow-hidden transition-all duration-700 ease-in-out ${listPaciente ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                    <Link to={'cadastro-paciente'}><li className="p-3 flex justify-start gap-5 text-[#57575B] pl-4  items-center hover:bg-[#E0E0E0]">Cadastrar</li></Link>
                                    <Link to={"listagem-pacientes"}><li className="p-3 flex justify-start gap-5 text-[#57575B] pl-4  items-center hover:bg-[#E0E0E0]">Listar</li></Link>
                                </ul>
                            </div>
                            <div>
                                <div onClick={() => changeRegistrationStatus('terapeuta')} className="flex items-center justify-between pr-6 hover:bg-[#E0E0E0] cursor-pointer">
                                    <div className="p-3 flex justify-start gap-5 text-[#57575B] pl-4  items-center">
                                        <FaUserMd size={15} />
                                        <p className="text-base">Terapeutas</p>
                                    </div>
                                    <MdOutlineKeyboardArrowDown size={20} className={`transform transition-transform duration-700 ${listTerapeuta ? "rotate-180" : "rotate-0"}`} />
                                </div>
                                <ul className={`pl-10 overflow-hidden transition-all duration-700 ease-in-out ${listTerapeuta ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                    <Link to={'cadastro-terapeuta'}><li className="p-3 flex justify-start gap-5 text-[#57575B] pl-4  items-center hover:bg-[#E0E0E0]">Cadastrar</li></Link>
                                    <Link to={"listagem-terapeutas"}><li className="p-3 flex justify-start gap-5 text-[#57575B] pl-4  items-center hover:bg-[#E0E0E0]">Listar</li></Link>
                                </ul>
                            </div>
                            <div>
                                <div onClick={() => changeRegistrationStatus('convenio')} className="flex items-center justify-between pr-6 hover:bg-[#E0E0E0] cursor-pointer">
                                    <div className="p-3 flex justify-start gap-5 text-[#57575B] pl-4  items-center">
                                        <FaRegHandshake size={15} />
                                        <p className="text-base">Convênio</p>
                                    </div>
                                    <MdOutlineKeyboardArrowDown size={20} className={`transform transition-transform duration-700 ${listConvenio ? "rotate-180" : "rotate-0"}`} />
                                </div>
                                <ul className={`pl-10 overflow-hidden transition-all duration-700 ease-in-out ${listConvenio ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                                    <Link to={'cadastro-convenio'}><li className="p-3 flex justify-start gap-5 text-[#57575B] pl-4  items-center hover:bg-[#E0E0E0]">Cadastrar</li></Link>
                                    <Link to={"convenios"}><li className="p-3 flex justify-start gap-5 text-[#57575B] pl-4  items-center hover:bg-[#E0E0E0]">Listar</li></Link>
                                </ul>
                            </div>
                            <Link to={"/cadastro-usuario"}>
                                <div className="p-3 flex justify-start gap-5 text-[#57575B] pl-4 hover:bg-[#E0E0E0] items-center">
                                    <FaUserPlus size={15} />
                                    <p className="text-base">Cadastro Usuário</p>
                                </div>
                            </Link>
                            <Link to={"/faturamento"}>
                                <div className="p-3 flex justify-start gap-5 text-[#57575B] pl-4 hover:bg-[#E0E0E0] items-center">
                                    <FaFileInvoiceDollar size={15} />
                                    <p className="text-base">Faturamento</p>
                                </div>
                            </Link>
                            <Link to={"/financeiro"}>
                                <div className="p-3 flex justify-start gap-5 text-[#57575B] pl-4 hover:bg-[#E0E0E0] items-center">
                                    <FaDollarSign  size={15} />
                                    <p className="text-base">Financeiro</p>
                                </div>
                            </Link>
                            <Link to={"/despesas"}>
                                <div className="p-3 flex justify-start gap-5 text-[#57575B] pl-4 hover:bg-[#E0E0E0] items-center">
                                    <FaMoneyBillWave size={15} />
                                    <p className="text-base">Despesas</p>
                                </div>
                            </Link>
                            <Link to={"/profile"}>
                                <div className="p-3 flex justify-start gap-5 text-[#57575B] pl-4 hover:bg-[#E0E0E0] items-center">
                                    <RiAccountCircleLine size={15} />
                                    <p className="text-base">Perfil</p>
                                </div>
                            </Link>
                            <Link to={"*"}>
                                <div className="p-3 flex justify-start gap-5 text-[#57575B] pl-4 hover:bg-[#E0E0E0] items-center">
                                    <FiLogOut size={15} />
                                    <p className="text-base">Sair</p>
                                </div>
                            </Link>
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
            <SidebarInset>

                <main className="">
                    <Header isMobile />
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
