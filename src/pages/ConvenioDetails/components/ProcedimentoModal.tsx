import React from "react";
import Modal from "react-modal";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface ProcedimentoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    procedimentoData: {
        codigo: string;
        nome: string;
        valorCh: string | number;
        porteAnestesia: string | number;
        chAnestesista: string | number;
        custoOperacional: string | number;
        numAuxiliares: string | number;
        tempo: string | number;
        valorFilme: string | number;
        codigoTuss: string;
        convenioId: string | number;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProcedimentoModal: React.FC<ProcedimentoModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    procedimentoData,
    onChange,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                content: {
                    width: "60%",
                    height: "80%",
                    margin: "auto",
                    borderRadius: "10px",
                },
            }}
        >
            <h2 className="text-xl font-bold mb-4">Cadastrar Procedimento</h2>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <Input
                        type="text"
                        value={procedimentoData.codigo}
                        onChange={onChange}
                        name="codigo"
                        placeholder="Código"
                        valueLabel="Código" labelWidthValue={undefined} />
                    <Input
                        type="text"
                        value={procedimentoData.nome}
                        onChange={onChange}
                        name="nome"
                        placeholder="Nome do Procedimento"
                        valueLabel="Nome" labelWidthValue={undefined} />
                    <Input
                        type="number"
                        value={procedimentoData.valorCh}
                        onChange={onChange}
                        name="valorCh"
                        placeholder="Valor CH"
                        valueLabel="Valor CH" labelWidthValue={undefined} />
                    <Input
                        type="number"
                        value={procedimentoData.porteAnestesia}
                        onChange={onChange}
                        name="porteAnestesia"
                        placeholder="Porte Anestesia"
                        valueLabel="Porte Anestesia" labelWidthValue={undefined} />
                </div>
                <div className="flex gap-4">
                    <Input
                        type="number"
                        value={procedimentoData.chAnestesista}
                        onChange={onChange}
                        name="chAnestesista"
                        placeholder="CH Anestesista"
                        valueLabel="CH Anestesista" labelWidthValue={undefined} />
                    <Input
                        type="number"
                        value={procedimentoData.custoOperacional}
                        onChange={onChange}
                        name="custoOperacional"
                        placeholder="Custo Operacional"
                        valueLabel="Custo Operacional" labelWidthValue={undefined} />
                    <Input
                        type="number"
                        value={procedimentoData.numAuxiliares}
                        onChange={onChange}
                        name="numAuxiliares"
                        placeholder="Número de Auxiliares"
                        valueLabel="Número de Auxiliares" labelWidthValue={undefined} />
                    <Input
                        type="number"
                        value={procedimentoData.tempo}
                        onChange={onChange}
                        name="tempo"
                        placeholder="Tempo (minutos)"
                        valueLabel="Tempo" labelWidthValue={undefined} />
                </div>
                <div className="flex gap-4">
                    <Input
                        type="number"
                        value={procedimentoData.valorFilme}
                        onChange={onChange}
                        name="valorFilme"
                        placeholder="Valor Filme"
                        valueLabel="Valor Filme" labelWidthValue={undefined} />
                    <Input
                        type="text"
                        value={procedimentoData.codigoTuss}
                        onChange={onChange}
                        name="codigoTuss"
                        placeholder="Código TUSS"
                        valueLabel="Código TUSS" labelWidthValue={undefined} />
                    <Input
                        type="number"
                        value={procedimentoData.convenioId}
                        onChange={onChange}
                        name="convenioId"
                        placeholder="Convênio ID"
                        valueLabel="Convênio ID" labelWidthValue={undefined} />
                </div>
            </div>
            <div className="flex gap-4 mt-6">
                <Button onClick={onSubmit}>Cadastrar</Button>
                <Button onClick={onClose} variant="secondary">
                    Cancelar
                </Button>
            </div>
        </Modal>
    );
};

export default ProcedimentoModal;
