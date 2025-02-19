import React from "react";
import Input from "@/components/Input";
import InputMask from "react-input-mask";
import Select from "@/components/Select";

interface ConvenioFormProps {
    isDisabled: boolean;
    formData: {
        modoRecebimento: string;
        descricao: string;
        razaoSocial: string;
        cnpj: string;
        inscricaoEstadual: string;
        inscricaoMunicipal: string;
        telefone: string;
        contato: string;
        site: string;
        email: string;
        observacao: string;
        procedimentos: string;
        medicamentos: string;
        taxas: string;
        materiais: string;
        valorFilme: string;
        diasRetornoEletivo: string;
        diasRetornoEmergencia: string;
        vencimentoContrato: string;
        tagImpressaoDeSaia: string;
        planoDeContas: string;
        alertaFichaAtendimento: string;
        cep: string;
        cidade: string;
        estado: string;
        endereco: string;
        numero: string;
        complemento: string;
        bairro: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ConvenioForm: React.FC<ConvenioFormProps> = ({ isDisabled, formData, onChange }) => {

    return (
        <div>
            <div>
                <div className="flex p-2 gap-4 items-center mt-5">
                    <Select
                        value={formData.modoRecebimento}
                        onChange={onChange}
                        name="Modo Recebimento"
                        options={[
                            { value: "", label: "Selecione uma opção" },
                            { value: "convenio", label: "Convênio" },
                            { value: "particular", label: "Particular" },
                            { value: "sus", label: "SUS" },
                            { value: "cortesia", label: "Contesia" },
                        ]}
                        valueLabel="Modo Recebimento"
                        labelWidthValue='w-2/5'
                        disabled={isDisabled}
                    />
                    <Input
                        type="text"
                        value={formData.descricao}
                        onChange={onChange}
                        name="Descrição"
                        placeholder="Descrição"
                        valueLabel="Descrição"
                        labelWidthValue='w-1/5'
                        disabled={isDisabled}
                    />
                    <Input
                        type="text"
                        value={formData.razaoSocial}
                        onChange={onChange}
                        name="Razão Social"
                        placeholder="Razão Social"
                        valueLabel="Razão Social"
                        labelWidthValue='w-1/5'
                        disabled={isDisabled}
                    />
                    <div>
                        <label htmlFor="" className="flex flex-col w-1/5 text-sm">
                            CNPJ
                        </label>
                        <InputMask
                            mask="99.999.999/9999-99"
                            value={formData.cnpj}
                            onChange={onChange}
                            placeholder="Digite o CNPJ"
                            className="bg-white border border-gray-300 p-[7px] rounded-md h-10"
                            disabled={isDisabled}
                        ></InputMask>
                    </div>
                    <Input
                        type="text"
                        value={formData.inscricaoEstadual}
                        onChange={onChange}
                        name="Inscrição Estadual"
                        placeholder="Inscrição Estadual"
                        valueLabel="Inscrição Estadual"
                        labelWidthValue='w-1/5'
                        disabled={isDisabled}
                    />
                </div>
                <div className="flex p-2 gap-4 items-center">
                    <Input
                        type="text"
                        value={formData.inscricaoMunicipal}
                        onChange={onChange}
                        name="Incrição Municipal"
                        placeholder="Inscrição Municipal"
                        valueLabel="Inscrição Municipal"
                        labelWidthValue='w-1/5'
                        disabled={isDisabled}
                    />
                    <label className="flex flex-col w-1/5 text-sm">
                        Telefone
                        <InputMask
                            mask="(99) 9999-9999"
                            value={formData.telefone}
                            onChange={onChange}
                            name="telefone"
                            placeholder="Telefone"
                            className="bg-white border border-gray-300 p-2 rounded-md w-full h-10"
                            disabled={isDisabled}
                        />
                    </label>
                    <label className="flex flex-col w-1/5 text-sm">
                        Contato
                        <InputMask
                            mask="(99) 9999-9999"
                            value={formData.contato}
                            onChange={onChange}
                            name="telefone"
                            placeholder="Contato"
                            className="bg-white border border-gray-300 p-2 rounded-md w-full h-10"
                            disabled={isDisabled}
                        />
                    </label>
                    <Input
                        type="text"
                        value={formData.site}
                        onChange={onChange}
                        name="Site"
                        placeholder="Site"
                        valueLabel="Site"
                        labelWidthValue='w-1/5'
                        disabled={isDisabled}
                    />
                    <Input
                        type="text"
                        value={formData.email}
                        onChange={onChange}
                        name="Email"
                        placeholder="Email"
                        valueLabel="Email"
                        labelWidthValue='w-1/5'
                        disabled={isDisabled}
                    />

                </div>
                <div className="flex p-2 gap-4 items-center">
                    <Input
                        type="text"
                        value={formData.observacao}
                        onChange={onChange}
                        name="Observação"
                        placeholder="Observação"
                        valueLabel="Observação"
                        labelWidthValue='w-1/5'
                        disabled={isDisabled}
                    />
                    <Select
                        value={formData.procedimentos}
                        onChange={onChange}
                        name="Procedimentos"
                        options={[
                            { value: "", label: "Selecione uma opção" },
                            { value: "convenio", label: "Convênio" },
                            { value: "particular", label: "Particular" },
                            { value: "sus", label: "SUS" },
                            { value: "cortesia", label: "Contesia" },
                        ]}
                        valueLabel="Procedimentos"
                        labelWidthValue='w-1/4'
                        disabled={isDisabled}
                    />
                    <Select
                        value={formData.medicamentos}
                        onChange={onChange}
                        name="Medicamentos"
                        options={[
                            { value: "", label: "Selecione uma opção" },
                            { value: "convenio", label: "Convênio" },
                            { value: "particular", label: "Particular" },
                            { value: "sus", label: "SUS" },
                            { value: "cortesia", label: "Contesia" },
                        ]}
                        valueLabel="Medicamentos"
                        labelWidthValue='w-1/4'
                        disabled={isDisabled}
                    />
                    <Select
                        value={formData.taxas}
                        onChange={onChange}
                        name="Taxas"
                        options={[
                            { value: "", label: "Selecione uma opção" },
                            { value: "convenio", label: "Convênio" },
                            { value: "particular", label: "Particular" },
                            { value: "sus", label: "SUS" },
                            { value: "cortesia", label: "Contesia" },
                        ]}
                        valueLabel="Taxas"
                        labelWidthValue='w-1/4'
                        disabled={isDisabled}
                    />
                    <Select
                        value={formData.materiais}
                        onChange={onChange}
                        name="Materiais"
                        options={[
                            { value: "", label: "Selecione uma opção" },
                            { value: "convenio", label: "Convênio" },
                            { value: "particular", label: "Particular" },
                            { value: "sus", label: "SUS" },
                            { value: "cortesia", label: "Contesia" },
                        ]}
                        valueLabel="Materiais"
                        labelWidthValue='w-1/4'
                        disabled={isDisabled}
                    />
                </div>
                <div className="flex p-2 gap-4 items-center">
                    <Input
                        type="number"
                        value={formData.valorFilme}
                        onChange={onChange}
                        name="Valor Filme"
                        placeholder="Valor Filme"
                        valueLabel="Valor Filme"
                        labelWidthValue='w-1/5'
                        disabled={isDisabled}
                    />
                    <Input
                        type="number"
                        value={formData.diasRetornoEletivo}
                        onChange={onChange}
                        name="Dias Retorno Eletivo"
                        placeholder="Dias Retorno Eletivo"
                        valueLabel="Dias Retorno Eletivo"
                        labelWidthValue='w-1/5'
                        disabled={isDisabled}
                    />
                    <Input
                        type="number"
                        value={formData.diasRetornoEmergencia}
                        onChange={onChange}
                        name="Dias Retorno Emerg"
                        placeholder="Dias Retorno Emerg."
                        valueLabel="Dias Retorno Emerg."
                        labelWidthValue='w-1/5'
                        disabled={isDisabled}
                    />
                    <Input
                        type="date"
                        value={formData.vencimentoContrato}
                        onChange={onChange}
                        name="Vencimento Contrato"
                        placeholder="Vencimento Contrato"
                        valueLabel="Vencimento Contrato"
                        labelWidthValue='w-1/5'
                        disabled={isDisabled}
                    />
                </div>
                <div className="flex p-2 gap-4 items-center">
                    <Input
                        type="text"
                        value={formData.tagImpressaoDeSaia}
                        onChange={onChange}
                        name="Tag Impressão de Saia"
                        placeholder="Tag Impressão de Saia"
                        valueLabel="Tag Impressão de Saia"
                        labelWidthValue='w-1/5'
                        disabled={isDisabled}
                    />
                    <Select
                        value={formData.planoDeContas}
                        onChange={onChange}
                        name="Plano de Contas"
                        options={[
                            { value: "", label: "Selecione uma opção" },
                            { value: "convenio", label: "Convênio" },
                            { value: "particular", label: "Particular" },
                            { value: "sus", label: "SUS" },
                            { value: "cortesia", label: "Contesia" },
                        ]}
                        valueLabel="Plano de Contas"
                        labelWidthValue='w-1/4'
                        disabled={isDisabled}
                    />
                    <Input
                        type="text"
                        value={formData.alertaFichaAtendimento}
                        onChange={onChange}
                        name="nome_mae"
                        placeholder="Alerta (Ficha de Atendimento)"
                        valueLabel="Alerta (Ficha de Atendimento)"
                        labelWidthValue='w-1/4'
                        disabled={isDisabled}
                    />
                </div>
            </div>
            <div>
                <h1>Endereço</h1>
                <div>
                    <div className="flex p-2 gap-4 items-center">
                        <Select
                            value={formData.cep}
                            onChange={onChange}
                            name="CEP"
                            options={[
                                { value: "", label: "Selecione uma opção" },
                                { value: "convenio", label: "Convênio" },
                                { value: "particular", label: "Particular" },
                                { value: "sus", label: "SUS" },
                                { value: "cortesia", label: "Contesia" },
                            ]}
                            valueLabel="CEP"
                            labelWidthValue='w-1/4'
                            disabled={isDisabled}
                        />
                        <Select
                            value={formData.cidade}
                            onChange={onChange}
                            name="Cidade"
                            options={[
                                { value: "", label: "Selecione uma opção" },
                                { value: "convenio", label: "Convênio" },
                                { value: "particular", label: "Particular" },
                                { value: "sus", label: "SUS" },
                                { value: "cortesia", label: "Contesia" },
                            ]}
                            valueLabel="Cidade"
                            labelWidthValue='w-1/4'
                            disabled={isDisabled}
                        />
                        <Input
                            type="text"
                            value={formData.estado}
                            onChange={onChange}
                            name="Estado"
                            placeholder="Estado"
                            valueLabel="Estado"
                            labelWidthValue='w-20'
                            disabled={isDisabled}
                        />
                        <Input
                            type="text"
                            value={formData.numero}
                            onChange={onChange}
                            name="Numero"
                            placeholder="N°"
                            valueLabel="N°"
                            labelWidthValue='w-16'
                            disabled={isDisabled}
                        />
                        <Input
                            type="text"
                            value={formData.endereco}
                            onChange={onChange}
                            name="Endereço"
                            placeholder="Endereço"
                            valueLabel="Endereço"
                            labelWidthValue='w-1/5'
                            disabled={isDisabled}
                        />
                    </div>
                    <div className="flex p-2 gap-4 items-center">
                        <Input
                            type="text"
                            value={formData.complemento}
                            onChange={onChange}
                            name="Complemento"
                            placeholder="Complemento"
                            valueLabel="Complemento"
                            labelWidthValue='w-1/5'
                            disabled={isDisabled}
                        />
                        <Input
                            type="text"
                            value={formData.bairro}
                            onChange={onChange}
                            name="Bairro"
                            placeholder="Bairro"
                            valueLabel="Bairro"
                            labelWidthValue='w-1/5'
                            disabled={isDisabled}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConvenioForm;
