import React, { useState } from "react";
import Button from "@/components/Button";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";

interface Procedimento {
    id: number;
    codigo: string;
    nome: string;
    valor_ch: string;
    porte_anestesia: number;
    ch_anestesista: number;
    custo_operacional: string;
    codigo_tuss: string;
    num_auxiliares: number;
    tempo: number;
    valor_filme: string;
}

interface ProcedimentosTableProps {
    procedimentos: Procedimento[];
    convenioId: number;
    onProcedimentoDeleted: (id: number) => void;
}

const ProcedimentosTable: React.FC<ProcedimentosTableProps> = ({
    procedimentos,
    onProcedimentoDeleted,
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [procedimentoToDelete, setProcedimentoToDelete] = useState<Procedimento | null>(null);

    const handleDelete = async () => {
        if (!procedimentoToDelete) return;

        try {
            const token = localStorage.getItem("authToken");
            await axios.delete(
                `https://sistema.clinicamultihabilit.com.br/api/procedimentos/${procedimentoToDelete.id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success("Procedimento deletado com sucesso!");
            onProcedimentoDeleted(procedimentoToDelete.id);
        } catch (error) {
            toast.error("Erro ao deletar o procedimento.");
        } finally {
            setModalOpen(false);
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Procedimentos do Convênio</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Código</th>
                        <th className="border border-gray-300 px-4 py-2">Nome</th>
                        <th className="border border-gray-300 px-4 py-2">Valor CH</th>
                        <th className="border border-gray-300 px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {procedimentos.map((procedimento) => (
                        <tr key={procedimento.id}>
                            <td className="border border-gray-300 px-4 py-2">{procedimento.codigo}</td>
                            <td className="border border-gray-300 px-4 py-2">{procedimento.nome}</td>
                            <td className="border border-gray-300 px-4 py-2">{procedimento.valor_ch}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Button
                                    onClick={() => {
                                        setProcedimentoToDelete(procedimento);
                                        setModalOpen(true);
                                    }}
                                    variant="danger"
                                >
                                    Deletar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={{
                    content: {
                        width: "40%",
                        margin: "auto",
                        borderRadius: "10px",
                    },
                }}
            >
                <h2 className="text-xl font-bold mb-4">Confirmação</h2>
                <p>Tem certeza que deseja deletar o procedimento?</p>
                <div className="flex gap-4 mt-6">
                    <Button onClick={handleDelete} variant="danger">
                        Confirmar
                    </Button>
                    <Button onClick={() => setModalOpen(false)} variant="secondary">
                        Cancelar
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default ProcedimentosTable;
