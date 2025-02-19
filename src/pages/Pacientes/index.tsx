import axios from "axios";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Definindo a interface dos dados do paciente e usuário
interface Usuario {
  nome_completo: string;
  nome_social?: string;
  cpf: string;
  data_nascimento: string;
  sexo: string;
  telefone?: string;
  celular?: string;
  email: string;
}

interface Paciente {
  usuario: Usuario;
}

const Pacientes: React.FC = () => {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Token não encontrado.");
        }

        const { data } = await axios.get<{ original: Paciente[] }>(
          "https://sistema.clinicamultihabilit.com.br/api/pacientes",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPacientes(data.original);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          toast.error("Sessão expirada. Você será redirecionado para o login.", {
            position: "bottom-right",
          });
          navigate("/login");
        } else {
          toast.error("Erro ao buscar pacientes.", {
            position: "bottom-right",
          });
        }
      }
    };

    fetchPacientes();
  }, [navigate]);

  const changeRoute = () => {
    navigate("/cadastro-paciente");
  };

  // Filtrando pacientes com base na busca
  const pacientesFiltrados = pacientes.filter((paciente) => {
    const termoBusca = busca.toLowerCase();
    return (
      paciente.usuario.nome_completo.toLowerCase().includes(termoBusca) ||
      paciente.usuario.cpf.includes(termoBusca)
    );
  });

  // Definindo as colunas da tabela
  const colunas: TableColumn<Paciente>[] = [
    {
      name: "Nome Completo",
      selector: (row) => row.usuario.nome_completo,
      sortable: true,
    },
    {
      name: "Nome Social",
      selector: (row) => row.usuario.nome_social || "Não informado",
      sortable: true,
    },
    {
      name: "CPF",
      selector: (row) =>
        row.usuario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
      sortable: true,
    },
    {
      name: "Data de Nascimento",
      selector: (row) =>
        new Date(row.usuario.data_nascimento).toLocaleDateString("pt-BR"),
      sortable: true,
    },
    {
      name: "Sexo",
      selector: (row) => row.usuario.sexo,
      sortable: true,
    },
    {
      name: "Telefone",
      selector: (row) => row.usuario.telefone || "Não informado",
      sortable: true,
    },
    {
      name: "Celular",
      selector: (row) => row.usuario.celular || "Não informado",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.usuario.email,
      sortable: true,
    },
  ];

  return (
    <div className="relative z-50 p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Pacientes</h3>
        <button
          onClick={changeRoute}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Cadastrar Paciente
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nome ou CPF"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full mb-4"
      />

      <DataTable
        columns={colunas}
        data={pacientesFiltrados}
        pagination
        highlightOnHover
        pointerOnHover
        noDataComponent="Nenhum paciente encontrado."
      />

      <ToastContainer />
    </div>
  );
};

export default Pacientes;
