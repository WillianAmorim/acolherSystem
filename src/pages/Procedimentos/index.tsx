import Input from "@/components/Input"
import axios from "axios"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from 'react-router-dom';
import Button from "@/components/Button";

const Procedimentos = () => {
    // {
    //     "codigo": "PROC-001",
    //     "nome": "Consulta Geral",
    //     "valor_ch": 150.00,
    //     "porte_anestesia": 3,
    //     "ch_anestesista": 2,
    //     "custo_operacional": 200.00,
    //     "num_auxiliares": 1,
    //     "tempo": 60,
    //     "valor_filme": 50.00
    // }
    const navigate = useNavigate();

    const [codigo, setCodigo] = useState('')
    const [nome, setNome] = useState('')
    const [valorCH, setValorCH] = useState('')
    const [porteAnestesia, setPorteAnestesia] = useState('')
    const [chAnestesia, setChAnestesia] = useState('')
    const [custoOperacional, setCustoOperacional] = useState('')
    const [numAuxiliares, setNumAuxiliares] = useState('')
    const [tempo, setTempo] = useState('')
    const [valorFilme, setValorFilme] = useState('')
    const [codigoTuss, setCodigoTuss] = useState('')

    const resetForm = () => {
        setCodigo('')
        setNome('')
        setValorCH('')
        setPorteAnestesia('')
        setCustoOperacional('')
        setNumAuxiliares('')
        setTempo('')
        setValorFilme('')
    }

    const sendRequest = async () => {

        const dadosProcedimento = {
            codigo: codigo,
            nome: nome,
            valor_ch: valorCH,
            porte_anestesia: porteAnestesia,
            ch_anestesista: chAnestesia,
            custo_operacional: custoOperacional,
            num_auxiliares: numAuxiliares,
            tempo: tempo,
            valor_filme: valorFilme,
        }

        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Token não encontrado")

            await axios.post("https://sistema.clinicamultihabilit.com.br/api/procedimentos", dadosProcedimento, {
                headers: { Authorization: `Bearer ${token}` },
            });

            resetForm()

            toast.success("Procedimento cadastrado com sucesso!", {
                position: "top-right",
                autoClose: 2000,
            });

        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                toast.error('Sessão expirada. Você será redirecionado para o login.', {
                    position: 'top-right',
                });
                navigate('/login');
            }
            toast.error("Erro ao cadastrar convênio.", { position: "top-right" });
            console.error(err);
        }
    }

    return (
        <div className="p-8 bg-[#FFF] min-h-screen">
            <h1>Cadastro de Procedimentos</h1>
            <div className="mt-5 flex flex-col gap-5">
                <div className="flex gap-4">
                    <Input
                        type="text"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        name="Código"
                        placeholder="Código"
                        valueLabel="Código"
                        labelWidthValue='w-1/5'
                    />
                    <Input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        name="Nome"
                        placeholder="Nome"
                        valueLabel="Nome"
                        labelWidthValue='w-1/5'
                    />
                    <Input
                        type="number"
                        value={valorCH}
                        onChange={(e) => setValorCH(e.target.value)}
                        name="Valor CH"
                        placeholder="Valor CH"
                        valueLabel="Valor CH"
                        labelWidthValue='w-1/5'
                    />
                    <Input
                        type="number"
                        value={porteAnestesia}
                        onChange={(e) => setPorteAnestesia(e.target.value)}
                        name="Porte Anestesia"
                        placeholder="Porte Anestesia"
                        valueLabel="Porte Anestesia"
                        labelWidthValue='w-1/5'
                    />
                    <Input
                        type="number"
                        value={chAnestesia}
                        onChange={(e) => setChAnestesia(e.target.value)}
                        name="CH Anestesista"
                        placeholder="CH Anestesista"
                        valueLabel="CH Anestesista"
                        labelWidthValue='w-1/5'
                    />
                </div>
                <div className="flex gap-4">
                    <Input
                        type="number"
                        value={custoOperacional}
                        onChange={(e) => setCustoOperacional(e.target.value)}
                        name="Custo Operacional"
                        placeholder="Custo Operacional"
                        valueLabel="Custo Operacional"
                        labelWidthValue='w-1/5'
                    />
                    <Input
                        type="number"
                        value={numAuxiliares}
                        onChange={(e) => setNumAuxiliares(e.target.value)}
                        name="N° Auxiliares"
                        placeholder="N° Auxiliares"
                        valueLabel="N° Auxiliares"
                        labelWidthValue='w-1/5'
                    />
                    <Input
                        type="number"
                        value={tempo}
                        onChange={(e) => setTempo(e.target.value)}
                        name="Tempo"
                        placeholder="Tempo"
                        valueLabel="Tempo"
                        labelWidthValue='w-1/5'
                    />
                    <Input
                        type="number"
                        value={valorFilme}
                        onChange={(e) => setValorFilme(e.target.value)}
                        name="Filme"
                        placeholder="Filme"
                        valueLabel="Filme"
                        labelWidthValue='w-1/5'
                    />
                    <Input
                        type="number"
                        value={codigoTuss}
                        onChange={(e) => setCodigoTuss(e.target.value)}
                        name="Código Tuss"
                        placeholder="Código Tuss"
                        valueLabel="Código Tuss"
                        labelWidthValue='w-1/5'
                    />
                </div>
                <div>
                    <Button
                        type="button"
                        onClick={sendRequest}
                    >
                        Cadastrar
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Procedimentos