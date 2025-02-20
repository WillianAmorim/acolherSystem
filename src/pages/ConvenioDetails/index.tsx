import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ConvenioForm from "./components/ConvenioForm";
import ProcedimentoModal from "./components/ProcedimentoModal";
import ProcedimentosTable from "./components/ProcedimentosTable";
import Button from "@/components/Button";
import axios from "axios";

const ConvenioDetails = () => {
    const location = useLocation();
    const convenio = location.state?.convenio || {}; // Garante que seja um objeto vazio se undefined.

    // Estado inicial para o formulário do convênio
    const [formData, setFormData] = useState({
        modoRecebimento: convenio?.modo_recebimento || "",
        descricao: convenio?.descricao || "",
        razaoSocial: convenio?.razao_social || "",
        cnpj: convenio?.cnpj || "",
        inscricaoEstadual: convenio?.inscricao_estadual || "",
        inscricaoMunicipal: convenio?.inscricao_municipal || "",
        telefone: convenio?.telefone || "",
        contato: convenio?.contato || "",
        site: convenio?.site || "",
        email: convenio?.email || "",
        observacao: convenio?.observacao || "",
        procedimentos: convenio?.procedimentos || "",
        medicamentos: convenio?.medicamentos || "",
        taxas: convenio?.taxas || "",
        materiais: convenio?.materiais || "",
        valorFilme: convenio?.valor_filme || "",
        diasRetornoEletivo: convenio?.dias_retorno_eletivo || "",
        diasRetornoEmergencia: convenio?.dias_retorno_emergencia || "",
        vencimentoContrato: convenio?.vencimento_contrato || "",
        tagImpressaoDeSaia: convenio?.tag_impressao_de_saia || "",
        planoDeContas: convenio?.plano_de_contas || "",
        alertaFichaAtendimento: convenio?.alerta_ficha_atendimento || "",
        cep: convenio?.cep || "",
        cidade: convenio?.cidade || "",
        estado: convenio?.estado || "",
        endereco: convenio?.endereco || "",
        numero: convenio?.numero || "",
        complemento: convenio?.complemento || "",
        bairro: convenio?.bairro || "",
    });

    const [procedimentoData, setProcedimentoData] = useState({
        codigo: "",
        nome: "",
        valorCh: "",
        porteAnestesia: "",
        chAnestesista: "",
        custoOperacional: "",
        numAuxiliares: "",
        tempo: "",
        valorFilme: "",
        codigoTuss: "",
        convenioId: convenio?.id || "",
    });

    const [procedimentos, setProcedimentos] = useState<any[]>([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const habilitarEdicao = () => setIsDisabled(!isDisabled);

    const handleConvenioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProcedimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProcedimentoData({ ...procedimentoData, [e.target.name]: e.target.value });
    };

    const handleProcedimentoSubmit = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const { data } = await axios.post(
                "https://sistema.clinicaacolherslz.com.br/api/procedimentos",
                {
                    codigo: procedimentoData.codigo,
                    nome: procedimentoData.nome,
                    valor_ch: Number(procedimentoData.valorCh),
                    porte_anestesia: Number(procedimentoData.porteAnestesia),
                    ch_anestesista: Number(procedimentoData.chAnestesista),
                    custo_operacional: Number(procedimentoData.custoOperacional),
                    num_auxiliares: Number(procedimentoData.numAuxiliares),
                    tempo: Number(procedimentoData.tempo),
                    valor_filme: Number(procedimentoData.valorFilme),
                    codigo_tuss: procedimentoData.codigoTuss,
                    convenio_id: Number(procedimentoData.convenioId),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            toast.success("Procedimento cadastrado com sucesso!");
            setProcedimentos((prev) => [...prev, data]); // Atualiza a tabela de procedimentos
            setIsOpenModal(false); // Fecha o modal
        } catch (error) {
            console.error("Erro ao cadastrar procedimento:", error);
            toast.error("Erro ao cadastrar o procedimento. Tente novamente.");
        }
    };

    useEffect(() => {
        const fetchProcedimentos = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const { data } = await axios.get(
                    `https://sistema.clinicaacolherslz.com.br/api/convenios/${convenio.id}/procedimentos`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setProcedimentos(data);
            } catch (error) {
                toast.error("Erro ao carregar os procedimentos.");
            }
        };

        fetchProcedimentos();
    }, [convenio.id]);

    return (
        <div className="p-8 bg-[#FFF] min-h-screen">
            <div className="flex justify-between items-center">
                <h1>Informações Empresa</h1>
                <div className="flex gap-5">
                    <Button onClick={habilitarEdicao}>Editar Dados</Button>
                    <Button onClick={() => setIsOpenModal(true)}>Cadastrar Procedimentos</Button>
                </div>
            </div>

            <ConvenioForm
                isDisabled={isDisabled}
                formData={formData}
                onChange={handleConvenioChange}
            />

            <ProcedimentosTable
                procedimentos={procedimentos}
                convenioId={convenio.id}
                onProcedimentoDeleted={(id) =>
                    setProcedimentos(procedimentos.filter((p) => p.id !== id))
                }
            />

            <ProcedimentoModal
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                onSubmit={handleProcedimentoSubmit}
                procedimentoData={procedimentoData}
                onChange={handleProcedimentoChange}
            />

            <ToastContainer />
        </div>
    );
};

export default ConvenioDetails;
