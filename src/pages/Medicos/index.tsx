import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "@/components/Button";

interface Usuario {
  nome_completo: string;
  nome_social: string;
  cpf: string;
  data_nascimento: string;
  sexo: string;
  telefone: string;
  celular: string;
  email: string;
}

interface Medico {
  id: number;
  usuario: Usuario;
}

const ListagemMedicos: React.FC = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [busca, setBusca] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedico, setSelectedMedico] = useState<Medico | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Token não encontrado");
        }

        const response = await axios.get<{ original: Medico[] }>(
          "https://sistema.clinicaacolherslz.com.br/api/medicos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMedicos(response.data.original);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            toast.error("Sessão expirada. Você será redirecionado para o login.", {
              position: "bottom-right",
            });
            navigate("/login");
          } else if (err.response?.status === 403) {
            toast.error("Usuário não tem permissão.", { position: "bottom-right" });
          } else {
            toast.error("Erro ao buscar terapeutas.", { position: "bottom-right" });
          }
        } else {
          toast.error("Erro desconhecido ao buscar terapeutas.", { position: "bottom-right" });
        }
        console.error(err);
      } finally {
        setIsLoading(false); // Conclui o carregamento
      }
    };

    fetchMedicos();
  }, []);

  const handleDelete = async () => {
    if (!selectedMedico) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Token não encontrado");
      }

      await axios.delete(`https://sistema.clinicaacolherslz.com.br/api/medicos/${selectedMedico.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMedicos((prev) =>
        prev.filter((medico) => medico.id !== selectedMedico.id)
      );
      toast.success("Médico deletado com sucesso!", { position: "bottom-right" });
      setShowModal(false); // Fecha o modal
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          toast.error("Erro de autenticação: Token inválido ou expirado.", {
            position: "bottom-right",
          });
          navigate("/login");
        } else if (err.response?.status === 404) {
          toast.error("Médico não encontrado para exclusão.", {
            position: "bottom-right",
          });
        }
      } else {
        toast.error("Erro ao deletar médico.", { position: "bottom-right" });
      }
    }
  };

  const openModal = (medico: Medico) => {
    setSelectedMedico(medico);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedMedico(null);
    setShowModal(false);
  };

  const colunas: TableColumn<Medico>[] = [
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
        row.usuario.cpf.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4"
        ),
      sortable: true,
    },
    {
      name: "Data de Nascimento",
      selector: (row) =>
        new Date(row.usuario.data_nascimento).toLocaleDateString("pt-BR"),
      sortable: true,
    },
    {
      name: "Ações",
      cell: (row) => (
        <button
          onClick={() => openModal(row)}
          className="p-2 bg-destructive text-white rounded-md hover:bg-red-600 shadow-md"
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const medicosFiltrados = medicos.filter((medico) => {
    const termoBusca = busca.toLowerCase();
    return (
      medico.usuario.nome_completo.toLowerCase().includes(termoBusca) ||
      medico.usuario.cpf.includes(termoBusca)
    );
  });

  const handleCadastrarMedico = () => {
    navigate(`/medicos/cadastro`);
  };

  return (
    <div className="p-8 bg-[#FFF] min-h-screen">
      <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            {/* <i className="fa-solid fa-user-doctor text-[16px] text-foreground"></i> */}
            <h3 className="text-2xl font-medium text-[#575757]">Controle de terapeutas</h3>
          </div>
          <Button onClick={handleCadastrarMedico}>Cadastrar Médico</Button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nome ou CPF"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-screen bg-white">
            <ClipLoader color="#3B7B7B" size={60} />
          </div>
        ) : (
          <DataTable
            columns={colunas}
            data={medicosFiltrados}
            pagination
            highlightOnHover
            pointerOnHover
            noDataComponent="Nenhum médico encontrado."
            className="border border-gray-200 rounded-md"
          />
        )}
      </div>

      {/* Modal de Confirmação */}
      {showModal && selectedMedico && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirmar Exclusão
            </h3>
            <p className="text-gray-600 mb-6">
              Tem certeza de que deseja excluir o médico{" "}
              <span className="font-bold">{selectedMedico.usuario.nome_completo}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-destructive text-white rounded-md hover:bg-destructive-dark"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ListagemMedicos;
