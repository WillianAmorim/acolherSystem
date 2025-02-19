import axios from "axios";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { toast } from "react-toastify";
import DetalhesFaturamento from "./components/DetalhesFaturamento";

interface SelectedOption {
    label: string,
    value: string
}

type Option = { value: string; label: string };

const Faturamento = () => {
    const [selectedOptionFirst, setSelectedOptionFirst] = useState<SelectedOption | null>(null);
    const [terapeutas, setTerapeutas] = useState<{ id: string; usuario: { nome_completo: string } }[]>([]);
    const [convenios, setConvenios] = useState<{ id: string; razao_social: string }[]>([]);
    const [optionSecondSelect, setOptionSecondSelect] = useState<{ value: string; label: string }[]>([]);
    const [selectedOptionSecond, setSelectedOptionSecond] = useState<SingleValue<Option>>(null);
    const [mostrarDetalhesFaturamento, setMostrarDetalhesFaturamento] = useState(false);
    const [faturamento, setFaturamento] = useState(null)

    const [loadingInicial, setLoadingInicial] = useState(true);  // 🔹 Estado para loading inicial
    const [loadingFiltro, setLoadingFiltro] = useState(false);   // 🔹 Estado para loading ao filtrar
    const [selectedUnidade, setSelectedUnidade] = useState('');
    const [selectedDataInicial, setSelectedDataInicial] = useState('')
    const [selectedDataFinal, setSelectedDataFinal] = useState('')

    const optionsFirst = [
        { value: "terapeuta", label: "Terapeuta" },
        { value: "convenio", label: "Convênio" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("authToken");

                const { data: terapeutasData } = await axios.get(
                    "https://sistema.clinicamultihabilit.com.br/api/medicos",
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const { data: conveniosData } = await axios.get(
                    "https://sistema.clinicamultihabilit.com.br/api/convenios",
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                console.log(terapeutasData.original, "terapeutasData");
                console.log(conveniosData, "conveniosData");

                setTerapeutas(terapeutasData.original);
                setConvenios(conveniosData);
            } catch (err) {
                toast.error("Erro ao carregar dados.", { position: "bottom-right" });
            } finally {
                setLoadingInicial(false);  // 🔹 Finaliza o loading inicial
            }
        };

        fetchData();
    }, []);

    const filterSecondSelect = (selectedOptions: SingleValue<SelectedOption>) => {
        if (selectedOptions === null) return;
        setMostrarDetalhesFaturamento(false)
        setSelectedOptionSecond(null)

        setSelectedOptionFirst(selectedOptions); // Atualiza o estado

        if (selectedOptions.value === "terapeuta") {
            const nomesDeTerapeutas = terapeutas.map((terapeuta) => ({
                value: terapeuta.id,
                label: terapeuta.usuario.nome_completo,
            }));
            setOptionSecondSelect(nomesDeTerapeutas);
        } else if (selectedOptions.value === "convenio") {
            const nomesDeConvenios = convenios.map((convenio) => ({
                value: convenio.id,
                label: convenio.razao_social,
            }));
            setOptionSecondSelect(nomesDeConvenios);
        }
    };

    const selectedQueryRequest = (url:string) => {
        if (selectedDataInicial && !selectedDataFinal) {
            return `${url}?data_inicio=${selectedDataInicial}`
        } else if (selectedDataInicial && selectedDataFinal) {
            return `${url}?data_inicio=${selectedDataInicial}&data_final=${selectedDataFinal}`
        } else {
            return url
        }
    }

    const requestSearch = async () => {
        if (!selectedOptionFirst || !selectedOptionSecond) {
            toast.error("Selecione ambas as opções antes de filtrar.", { position: "bottom-right" });
            return;
        }
    
        setLoadingFiltro(true);
    
        // Verifica se selectedOptionFirst não é null
        if (selectedOptionFirst === null) {
            toast.error("Opção inválida selecionada.", { position: "bottom-right" });
            setLoadingFiltro(false);
            return;
        }
    
        const baseUrl = `https://sistema.clinicamultihabilit.com.br/api/financeiro/faturamento/${selectedOptionFirst.value}/${selectedOptionSecond.value}`;
    
        try {
            const token = localStorage.getItem("authToken");
    
            const { data } = await axios.get(selectedQueryRequest(baseUrl), {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            setMostrarDetalhesFaturamento(true);
            setFaturamento(data);
        } catch (err) {
            toast.error("Erro ao carregar dados.", { position: "bottom-right" });
        } finally {
            setLoadingFiltro(false);
        }
    };
    
    return (
        <div className="p-8 bg-[#FFF] min-h-screen">
            {loadingInicial ? (
                <p className="text-gray-500 text-center text-lg">Carregando dados...</p>
            ) : (
                <>
                    <div className="flex items-center gap-3 mb-5">
                        <h3 className="text-2xl font-medium text-[#575757]">Faturamento</h3>
                    </div>

                    <section>
                        <div className="flex gap-10">
                            <div className="max-w-[200px]">
                                <label>Selecione Terapeuta</label>
                                <Select
                                    options={optionsFirst}
                                    // onChange={(newValue) => filterSecondSelect(newValue)}
                                    onChange={filterSecondSelect}
                                    placeholder="Escolha"
                                />
                            </div>
                            <div className="max-w-[200px]">
                                <label>Selecione uma busca</label>
                                <Select
                                    options={optionSecondSelect}
                                    value={selectedOptionSecond}
                                    onChange={setSelectedOptionSecond}
                                    placeholder="Escolha"
                                />
                            </div>

                            <div className="max-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="">Unidade</label>
                                <select value={selectedUnidade} onChange={(e) => setSelectedUnidade(e.target.value)} name="" id="" className="border p-2 rounded-md">
                                    <option value="">Selecione uma unidade</option>
                                    <option value="multi-habilit">Multi Habilit</option>
                                </select>
                            </div>

                            <div className="max-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Data inicial
                                </label>
                                <input
                                    className="border border-gray-300 p-2 rounded-md"
                                    type="date"
                                    onChange={(e) => setSelectedDataInicial(e.target.value)}
                                />
                            </div>

                            <div className="max-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Data Final
                                </label>
                                <input
                                    className="border border-gray-300 p-2 rounded-md"
                                    type="date"
                                    onChange={(e) => setSelectedDataFinal(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="">
                            
                        </div>

                        <button
                            className="bg-[#1F2937] text-[#FFF] py-2 px-6 rounded-md mt-4"
                            onClick={requestSearch}
                        >
                            Filtrar
                        </button>
                    </section>

                    {
                        loadingFiltro ? (
                            <p className="text-gray-500 text-center text-lg">Carregando dados...</p>
                        ) :
                            <section className={mostrarDetalhesFaturamento ? 'block mt-7' : 'hidden'}>
                                <DetalhesFaturamento tipoFaturamento={selectedOptionFirst} faturamentoData={faturamento} />
                            </section>
                    }
                </>
            )}
        </div>
    );

};

export default Faturamento;
