
interface Option {
  title: string;
  icon: string;
  url: string;
  items?: Option[];
}

const navOptions: Option[] = [
  {
    icon: "fa-solid fa-chart-line",
    title: "Painel",
    url: "/dashboard"
  },
  {
    icon: "fa-regular fa-calendar-check",
    title: "Agenda",
    url: "/agenda"
  },
  {
    icon: "fa-solid fa-users-between-lines",
    title: "Usuários",
    url: "/usuarios"
  },
  {
    
    icon: "fa-solid fa-users",
    title: "Cadastro",
    url: "/cadastro"
  },
  {
    
    icon: "fa-solid fa-hospital-user",
    title: "Paciente",
    url: "/cadastro-paciente"
  },
  // {
  //   title: "Consultas",
  //   url: "/consultas"
  // },
  {
    icon: "fa-solid fa-layer-group",
    title: "Convenios",
    url: "/convenios"
  },
  // {
  //   title: "Pacientes",
  //   url: "/pacientes"
  // },
  {
    icon: "fa-solid fa-user-doctor",
    title: "Terapeutas",
    url: "/terapeutas"
  },
  {
   
    icon: "fa-solid fa-user",
    title: "Perfil",
    url: "/profile"
  },
  {
    icon: "fa-solid fa-clipboard-list",
    title: "Procedimentos",
    url: "/procedimentos"
  },
  // {
  //   title: "Terapeutas",
  //   url: "/terapeutas"
  // },
  // {
  //   icon: "",
  //   title: "Administração",
  //   url: "#",
  //   items: [
  //     {
  //       title: "Contatos",
  //       url: "/contatos"
  //     },
  //     {
  //       title: "Email/Marketing",
  //       url: "#"
  //     },
  //     {
  //       title: "Estoque",
  //       url: "#"
  //     },
  //     {
  //       title: "Faturamento TISS",
  //       url: "#"
  //     },
  //     {
  //       title: "Financeiro",
  //       url: "#"
  //     },
  //     {
  //       title: "Ganhos Profissionais",
  //       url: "#"
  //     },
  //     {
  //       title: "Gestão de Contratos",
  //       url: "#"
  //     },
  //     {
  //       title: "Gestão de Cuidados",
  //       url: "#"
  //     },
  //     {
  //       title: "Gestão de Tarefas",
  //       url: "#"
  //     },
  //     {
  //       title: "Painel de Assinaturas",
  //       url: "#"
  //     },
  //     {
  //       title: "NFS-e",
  //       url: "#"
  //     },
  //     {
  //       title: "Pesquisas de Satisfação",
  //       url: "#"
  //     },
  //     {
  //       title: "Relatórios",
  //       url: "#"
  //     }
  //   ]
  // },
  // {
  //   title: "Configurações",
  //   url: "#",
  //   items: [
  //     {
  //       title: "Configurar Clínica",
  //       url: "#"
  //     },
  //     {
  //       title: "Configurar Conta",
  //       url: "#"
  //     },
  //     {
  //       title: "Prontuário Eletrônico",
  //       url: "#"
  //     },
  //     {
  //       title: "Vacinas",
  //       url: "#"
  //     },
  //   ]
  // },
  {
    icon: "fa-solid fa-right-from-bracket",
    title: "Sair",
    url: "/logout"
  },
];

export default navOptions;
