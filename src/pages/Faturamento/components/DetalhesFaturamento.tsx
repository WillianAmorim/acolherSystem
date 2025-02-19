import Listagem from "./Listagem";

interface DetalhesFaturamentoProps {
    tipoFaturamento: { label: string; value: string } | null;
    faturamentoData: {
        total_faturado: number;
        medico?: { nome: string; crm: string };
        lista_atendimentos?: { convenio: { codigo: string; razao_social: string } }[];
    } | null;
}

const DetalhesFaturamento = ({ tipoFaturamento, faturamentoData }: DetalhesFaturamentoProps) => {
    // Se não houver dados ou se total_faturado for 0, não renderiza nada
    if (!tipoFaturamento || !faturamentoData) {
        return null;
    } else if (faturamentoData.total_faturado === 0) {
        return <p className="min-h-full text-center p-8 mt-2">Sem faturamento</p>
    }

    return (
        <div className="">
            <h1 className="py-4 text-2xl">Faturamento {tipoFaturamento?.label} </h1>
            <section>
                {tipoFaturamento?.value === 'terapeuta' ? (
                    <>
                        <ul className="flex gap-5 pt-5 pb-5">
                            <li className="bg-blue-300 text-[#FFF] rounded-md p-8">
                                <strong>Total Faturado:</strong> {faturamentoData?.total_faturado}
                            </li>
                            <li className="bg-green-300 text-[#FFF] rounded-md p-8">
                                <strong>Nome:</strong> {faturamentoData?.medico?.nome || 'N/A'}
                            </li>
                            <li className="bg-yellow-300 text-[#FFF] rounded-md p-8">
                                <strong>CRM:</strong> {faturamentoData?.medico?.crm || 'N/A'}
                            </li>
                        </ul>
                        <Listagem tipoFaturamento={tipoFaturamento} faturamentoData={faturamentoData} />
                    </>

                ) : tipoFaturamento?.value === 'convenio' ? (
                    <>
                        <ul className="flex gap-5 pt-5 pb-5">
                            <li className="bg-blue-300 text-[#FFF] rounded-md p-8">
                                <strong>Total Faturado:</strong> {faturamentoData?.total_faturado}
                            </li>
                            <li className="bg-red-300 text-[#FFF] rounded-md p-8">
                                <strong>Total Faturado:</strong> {faturamentoData?.lista_atendimentos?.[0]?.convenio?.codigo}
                            </li>
                            <li className="bg-green-300 text-[#FFF] rounded-md p-8">
                                <strong>Convênio:</strong> {faturamentoData?.lista_atendimentos?.[0]?.convenio?.razao_social || 'N/A'}
                            </li>
                            <li className="bg-yellow-300 text-[#FFF] rounded-md p-8">
                                <strong>Código:</strong> {faturamentoData?.lista_atendimentos?.[0]?.convenio?.codigo || 'N/A'}
                            </li>
                        </ul>
                        <Listagem tipoFaturamento={tipoFaturamento} faturamentoData={faturamentoData} />
                    </>
                ) : null}
            </section>
        </div>
    );
};

export default DetalhesFaturamento;
