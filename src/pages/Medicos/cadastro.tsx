import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import RegimeTrabalhistaFields from "./components/RegimeTrabalhistaFields";
import BuscarCpf from "./components/BuscarCpf";

interface Usuario {
  id: number;
  nome_completo: string;
  cpf: string;
  medico?: {
    regime_trabalhista: number;
    carga_horaria: number;
    cnpj: string;
    id: number;
  };
}

const CadastroMedico: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [buscaCpf, setBuscaCpf] = useState<string>("");
  const [usuarioEncontrado, setUsuarioEncontrado] = useState<Usuario | null>(null);
  const [regimeTrabalhista, setRegimeTrabalhista] = useState<string>("");
  const [cargaHoraria, setCargaHoraria] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token não encontrado");

        const response = await axios.get<Usuario[]>(
          "https://sistema.clinicamultihabilit.com.br/api/usuarios",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsuarios(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          toast.error('Sessão expirada. Você será redirecionado para o login.', {
            position: 'bottom-right',
          });
          navigate('/login');
        } 
        toast.error("Erro ao buscar usuários", { position: "bottom-right" });
        console.error(err);
      }
    };

    fetchUsuarios();
  }, []);

  const handleCpfSearch = () => {
    const usuario = usuarios.find(
      (u) => u.cpf.replace(/[.-]/g, "") === buscaCpf.replace(/[.-]/g, "")
    );

    if (usuario) {
      setUsuarioEncontrado(usuario);
      setUsuarioId(usuario.id);

      if (usuario.medico) {
        const { regime_trabalhista, carga_horaria, cnpj } = usuario.medico;
        setRegimeTrabalhista(String(regime_trabalhista));
        setCargaHoraria(String(carga_horaria));
        setCnpj(cnpj);
        toast.info("Terapeuta já cadastrado. Exibindo informações.", {
          position: "bottom-right",
        });
      } else {
        resetMedicoFields();
        toast.success("Informe os dados restantes para realizar o cadastro.", {
          position: "bottom-right",
        });
      }
    } else {
      setUsuarioEncontrado(null);
      setUsuarioId(null);
      toast.error("Usuário não encontrado.", { position: "top-right" });
    }
  };

  const resetMedicoFields = () => {
    setRegimeTrabalhista("");
    setCargaHoraria("");
    setCnpj("");
  };

  const resetFormulario = () => {
    setBuscaCpf("");
    setUsuarioEncontrado(null);
    setUsuarioId(null);
    resetMedicoFields();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!usuarioId) {
      toast.error("Usuário não selecionado.", { position: "bottom-right" });
      return;
    }
  
    const dadosMedico = {
      regime_trabalhista: parseInt(regimeTrabalhista, 10),
      carga_horaria: parseInt(cargaHoraria, 10),
      cnpj: cnpj.replace(/[^0-9]/g, ""),
      id_usuario: usuarioId,
    };
  
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token não encontrado");
  
      if (usuarioEncontrado?.medico) {
        // Atualizar terapeuta existente (PUT)
        const medicoId = usuarioEncontrado.medico.id;
        await axios.put(`https://sistema.clinicamultihabilit.com.br/api/medicos/${medicoId}`, dadosMedico, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Terapeuta atualizado com sucesso!", {
          position: "bottom-right",
          onClose: () => {
            navigate('/terapeutas');
          },
        });
      } else {
        // Atualizar o usuário para "medico" antes de cadastrar o médico
        const dadosUsuarioAtualizado = {
          ...usuarioEncontrado, // Dados existentes do usuário
          role: "medico", // Atualiza a role
        };
  
        // Envia a requisição para atualizar o usuário
        await axios.put(
          `https://sistema.clinicamultihabilit.com.br/api/usuarios/${usuarioId}`,
          dadosUsuarioAtualizado,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        // Criar novo terapeuta (POST)
        await axios.post("https://sistema.clinicamultihabilit.com.br/api/medicos", dadosMedico, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        toast.success("Terapeuta cadastrado com sucesso!", {
          position: "bottom-right",
          onClose: () => {
            navigate('/terapeutas');
          },
        });
      }
  
      resetFormulario();
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error('Sessão expirada. Você será redirecionado para o login.', {
          position: 'bottom-right',
        });
        navigate('/login');
      } 
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        Object.keys(errors).forEach((campo) => {
          errors[campo].forEach((mensagem: string) => {
            toast.error(mensagem, { position: "bottom-right" });
          });
        });
      } else {
        toast.error("Erro ao salvar terapeuta.", { position: "bottom-right" });
      }
    }
  };

  return (
    <div className="p-8 bg-[#FFF] min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          {/* <i className="fa-solid fa-circle-plus text-[16px] text-foreground"></i> */}
          <h3 className="text-2xl font-medium text-[#575757]">Registrar terapeuta</h3>
        </div>

        <BuscarCpf
          buscaCpf={buscaCpf}
          setBuscaCpf={setBuscaCpf}
          handleCpfSearch={handleCpfSearch}
        />

        {usuarioEncontrado && (
          <RegimeTrabalhistaFields
            regimeTrabalhista={regimeTrabalhista}
            setRegimeTrabalhista={setRegimeTrabalhista}
            cargaHoraria={cargaHoraria}
            setCargaHoraria={setCargaHoraria}
            cnpj={cnpj}
            setCnpj={setCnpj}
          />
        )}

        <div className="mt-6">
          <button
            disabled={!usuarioEncontrado}
            type="submit"
            className={`p-2  text-white rounded-md text-sm
              ${
                !usuarioEncontrado
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#084E6F] hover:bg-[#54719C]"
              }`
            }
          >
            {usuarioEncontrado?.medico ? "Atualizar" : "Registrar"}
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default CadastroMedico;
