import DataTable from "react-data-table-component"

interface ListagemProps {
    tipoFaturamento: { value: string };
    faturamentoData: any;
}

interface Terapeuta {
    convenio: {
        codigo: string;
        razao_social: string;
    };
    data_agendada: string;
    numero_guia: null | string; // Permite null ou string
    procedimento: {
        codigo: string;
        nome: string;
        valor_unitario: number; // Alterado para number, se aplicável
    };
}

interface Convenio {
    convenio: {
        codigo: string;
        razao_social: string;
    };
    data_agendada: string;
    numero_guia: null | string; // Permite null ou string
    procedimento: {
        codigo: string;
        nome: string;
        valor_unitario: number; // Alterado para number, se aplicável
    };
}

const Listagem: React.FC<ListagemProps> = ({ tipoFaturamento, faturamentoData }) => {

    console.log("faturamentoData:", faturamentoData);
    console.log("lista_atendimentos:", faturamentoData);


    const columnsTerapeuta = [
        {
            name: 'Nome',
            selector: (row: Terapeuta) => {
                return row?.procedimento.nome; // Evita erro se algum campo for undefined
            },
            sortable: true,
        },
        {
            name: 'Procedimento',
            selector: (row: Terapeuta) => row?.procedimento.codigo,
            sortable: true,
        },
        {
            name: 'Valor',
            selector: (row: Terapeuta) => row?.procedimento.valor_unitario,
            sortable: true,
        },
        {
            name: 'Data',
            selector: (row: Terapeuta) => row?.data_agendada,
            sortable: true,
        },
        {
            name: 'Convênio',
            selector: (row: Terapeuta) => row?.convenio.razao_social,
            sortable: true,
        }
    ];

    const columnsConvenio = [
        {
            name: 'Data',
            selector: (row: Convenio) => {
                console.log(row, 'rowSelecionada')
                // Certifique-se de acessar uma propriedade dentro do objeto, por exemplo:
                return row.data_agendada;
            },
            sortable: true,
        },
        {
            name: 'Cod. Procedimento',
            selector: (row: Convenio) => {
                // Aqui você pode ter certeza de que está acessando uma propriedade específica
                return row.procedimento.codigo;
            },
            sortable: true,
        },
        {
            name: 'Nome Procedimento',
            selector: (row: Convenio) => {
                // Aqui você pode ter certeza de que está acessando uma propriedade específica
                return row.procedimento.nome;
            },
            sortable: true,
        },
        {
            name: 'Nome Procedimento',
            selector: (row: Convenio) => {
                // Aqui você pode ter certeza de que está acessando uma propriedade específica
                return row.procedimento.valor_unitario;
            },
            sortable: true,
        },
    ];

    const paginationOptions = {
        rowsPerPageText: 'Linhas por página:',
        rangeSeparatorText: 'de',
        noRowsPerPage: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: 'Todos',
    };

    return (
        <DataTable
            key={JSON.stringify(faturamentoData)} // Isso força a re-renderização quando os dados mudam
            columns={tipoFaturamento.value === 'terapeuta' ? columnsTerapeuta : tipoFaturamento.value === 'convenio' ? columnsConvenio : []}
            data={tipoFaturamento.value === 'terapeuta' ? faturamentoData?.lista_procedimentos || [] : tipoFaturamento.value === 'convenio' ? faturamentoData?.lista_atendimentos || [] : []}
            pagination
            paginationComponentOptions={paginationOptions}
            highlightOnHover
        />

    )
}

export default Listagem