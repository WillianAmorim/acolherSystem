import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import ConvenioModal from "./components/ConvenioModal";
import useConvenios from "./hooks/useConvenios";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { FaTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

interface Convenio {
    valor_filme: string;
    razao_social: string;
    id: number;
    empresa: string;
    cnpj: string;
    valor_convenio: string;
}

// interface ConvenioFormData {
//   empresa: string;
//   cnpj: string;
//   valor_convenio: string;
// }

const Convenios = () => {
    const navigate = useNavigate();
    const { loading, error } = useConvenios();
    // const [setModalOpen] = useState(false);
    // const [selectedConvenio, setSelectedConvenio] = useState<Convenio | null>(null);
    const [convenios, setConvenios] = useState<Convenio[]>([])

    // const handleModalClose = () => setModalOpen(false);

    const handleRowClick = (row: { id: number; }) => {
        navigate(`/convenios/${row.id}`, { state: { convenio: row } }); // Substitua `row.id` pelo identificador correto
    };

    useEffect(() => {
        const fetchConvenios = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const { data: conveniosRequest } = await axios.get(
                    "https://sistema.clinicaacolherslz.com.br/api/convenios",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                //console.log(conveniosRequest)
                setConvenios(conveniosRequest)


            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    toast.error('Sessão expirada. Você será redirecionado para o login.', {
                        position: 'bottom-right',
                    });
                    navigate('/login');
                }
                toast.error("Erro ao buscar convênios.", { position: "bottom-right" });
                console.error(err);
            } finally {
                // setLoading(false);
            }
        };

        fetchConvenios();
    }, []);

    const pageCadastroConvenio = () => {
        navigate("/cadastro-convenio");
    }

    const columns = [
        {
            name: "Empresa",
            selector: (row: Convenio) => row.razao_social,
            sortable: true,
        },
        {
            name: "CNPJ",
            selector: (row: Convenio) =>
                row.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"),
            sortable: true,
        },
        {
            name: "Valor Convênio (R$)",
            selector: (row: Convenio) => row.valor_filme,
            sortable: true,
            right: true,
        },
        {
                    name: "Ações",
                    cell: (row: any) => (
                        <div className="flex space-x-2">
                           
                            <button
                                onClick={() => handleDeleteConvenio(row)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                title="Deletar"
                            >
                                <FaTrashCan />
                            </button>
                        </div>
                    ),
                },
    ];


    const handleDeleteConvenio = async (convenio: any) => {
        Swal.fire({
            title: 'Confirmação de Exclusão',
            text: 'Tem certeza que deseja excluir este convênio?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Não, cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem("authToken");
                    await axios.delete(`https://sistema.clinicaacolherslz.com.br/api/convenios/${convenio.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    // Atualizar a tabela removendo o convênio deletado
                    setConvenios((prevConvenios) =>
                        prevConvenios.filter((item) => item.id !== convenio.id)
                    );
    
                    toast.success("Convênio deletado com sucesso!", { position: "bottom-right" });
                } catch (err) {
                    toast.error("Erro ao deletar convênio.", { position: "bottom-right" });
                    console.error(err);
                }
            }
        });
    };

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    return (
        <div className="p-8 bg-[#FFF] min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        {/* <i className="fa-solid fa-layer-group"></i> */}
                        <h1 className="text-2xl font-semibold text-[#575757]">Cadastro de Convênios</h1>
                    </div>
                    <Button onClick={pageCadastroConvenio}>Cadastrar Convênio</Button>
                </div>

                {loading && (
                    <div className="flex justify-center items-center h-screen bg-white">
                        <ClipLoader color="#3bl7B7" size={60} />
                    </div>
                )}
                {error && <p className="text-red-500 text-center">Erro ao carregar os convênios.</p>}

                {!loading && !error && (
                    <DataTable
                        columns={columns}
                        data={convenios}
                        pagination
                        paginationComponentOptions={paginationComponentOptions}
                        highlightOnHover
                        pointerOnHover
                        className="border border-gray-200 rounded-md"
                        onRowClicked={handleRowClick} // Define o handler de clique
                        noDataComponent={
                            <div className="text-gray-500 text-center py-6">
                                Nenhum convênio encontrado.
                            </div>
                        }
                    />
                )}
            </div>

            <ToastContainer />
        </div>
    );
};

export default Convenios;
