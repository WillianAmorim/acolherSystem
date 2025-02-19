import Input from "@/components/Input";
import Select from "@/components/Select";
import axios from "axios";
import { SetStateAction, useState } from "react";
import InputMask from 'react-input-mask';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Button from "@/components/Button";

const CadastroConvenio = () => {
    const [modoRecebimento, setModoRecebimento] = useState('');
    const [descricao, setDescricao] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [inscricaoEstatual, setInscricaoEstadual] = useState('');
    const [inscricaoMunicipal, setInscricaoMunicipal] = useState('');
    const [telefone, setTelefone] = useState('');
    const [contato, setContato] = useState('');
    const [site, setSite] = useState('');
    const [email, setEmail] = useState('');
    const [observacao, setObservacao] = useState('');
    const [procedimentos, setProcedimentos] = useState('');
    const [medicamentos, setMedicamentos] = useState('');
    const [taxas, setTaxas] = useState('');
    const [materiais, setMateriais] = useState('');
    const [valorFilme, setValorFilme] = useState('');
    const [diasRetornoEletivo, setDiasRetornoEletivo] = useState('');
    const [diasRetornoEmergencia, setDiasRetornoEmergencia] = useState('');
    const [vencimentoContrato, setVencimentoContrato] = useState('');
    const [tagImpressaoDeSaia, setTagImpressaoDeSaia] = useState('');
    const [planoDeContas, setPlanoDeContas] = useState('');
    const [alertaFichaAtendimento, setAlertaFichaAtendimento] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [opcao, setOpcao] = useState("default");
    const [inputRequired, setInputRequired] = useState(false);

    const navigate = useNavigate();

    const checkDate = (valorVencimentoContrato: string) => {
        const dataAtual = new Date();

        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();

        const dataAtualizada = new Date(`${ano}-${mes}-${dia}`);
        const dataSelecionada = new Date(valorVencimentoContrato);

        if (dataSelecionada < dataAtualizada) {
            return toast.error('A data precisa ser maior que a atual.', {
                position: 'top-right',
                autoClose: 2000,
            });
        }
    };

    const replaceCNPJ = () => {
        const cnpjValido = cnpj.replace(/[./-]/g, '');
        return cnpjValido;
    };

    const resetForm = () => {
        setModoRecebimento('');
        setDescricao('');
        setRazaoSocial('');
        setCnpj('');
        setInscricaoEstadual('');
        setInscricaoMunicipal('');
        setTelefone('');
        setContato('');
        setSite('');
        setEmail('');
        setObservacao('');
        setProcedimentos('');
        setMedicamentos('');
        setTaxas('');
        setMateriais('');
        setValorFilme('');
        setDiasRetornoEletivo('');
        setDiasRetornoEmergencia('');
        setVencimentoContrato('');
        setTagImpressaoDeSaia('');
        setPlanoDeContas('');
        setAlertaFichaAtendimento('');
        setCep('');
        setCidade('');
        setEstado('');
        setEndereco('');
        setNumero('');
        setComplemento('');
        setBairro('');
    };

    const validateForm = () => {
        if (modoRecebimento === "convenio" || modoRecebimento === "sus") {
            const camposObrigatorios = [
                descricao,
                razaoSocial,
                cnpj,
                inscricaoEstatual,
                inscricaoMunicipal,
                telefone,
                contato,
                site,
                email,
                observacao,
                procedimentos,
                medicamentos,
                taxas,
                materiais,
                valorFilme,
                vencimentoContrato,
                tagImpressaoDeSaia,
                alertaFichaAtendimento,
                cep,
                cidade,
                estado,
                endereco,
                numero,
                complemento,
                bairro,
            ];

            const algumCampoVazio = camposObrigatorios.some((campo) => campo === "");

            if (algumCampoVazio) {
                toast.error("Preencha todos os campos obrigatórios.", {
                    position: "top-right",
                    autoClose: 2000,
                });
                return false; // Impede o envio do formulário
            }
        }
        return true; // Permite o envio do formulário
    };

    const sendRequest = async () => {
        // Valida o formulário antes de enviar
        if (!validateForm()) {
            return; // Interrompe o envio se a validação falhar
        }

        const dadosCadastroConvenio = {
            modo_recebimento: modoRecebimento,
            descricao: descricao,
            razao_social: razaoSocial,
            cnpj: replaceCNPJ(),
            inscricao_estadual: inscricaoEstatual,
            inscricao_municipal: inscricaoMunicipal,
            telefone: telefone,
            contato: contato,
            site: site,
            email: email,
            observacao: observacao,
            procedimentos: procedimentos,
            medicamentos: medicamentos,
            taxas: taxas,
            materiais: materiais,
            valor_filme: valorFilme,
            dias_retorno_eletivo: diasRetornoEletivo,
            dias_retorno_emergencia: diasRetornoEmergencia,
            vencimento_contrato: vencimentoContrato,
            tag_impressao_de_saia: tagImpressaoDeSaia,
            plano_de_contas: planoDeContas,
            alerta_ficha_atendimento: alertaFichaAtendimento,
            cep: cep,
            cidade: cidade,
            estado: estado,
            endereco: endereco,
            numero: numero,
            complemento: complemento,
            bairro: bairro,
        };

        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("Token não encontrado");
            checkDate(vencimentoContrato);

            await axios.post("https://sistema.clinicamultihabilit.com.br/api/convenios", dadosCadastroConvenio, {
                headers: { Authorization: `Bearer ${token}` },
            });

            resetForm();
            toast.success("Convênio cadastrado com sucesso!", {
                position: "top-right",
                autoClose: 2000,
                onClose: () => navigate('/convenios'),
            });
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                toast.error('Sessão expirada. Você será redirecionado para o login.', {
                    position: 'bottom-right',
                });
                navigate('/login');
            }
            toast.error("Erro ao cadastrar convênio.", { position: "bottom-right" });
            console.error(err);
        }
    };

    const handleSelectChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        const selectedValue = e.target.value;
        setModoRecebimento(selectedValue);
        setOpcao(selectedValue);

        // Atualiza o estado inputRequired imediatamente
        setInputRequired(selectedValue !== "particular");
    };

    return (
        <div className="p-8 bg-[#FFF] min-h-screen">
            <div>
                <h1>Informações Empresa</h1>
                <div className="flex p-2 gap-4 items-center">
                    <Select
                        value={modoRecebimento}
                        onChange={handleSelectChange}
                        name="Modo Recebimento"
                        options={[
                            { value: "", label: "Selecione uma opção" },
                            { value: "convenio", label: "Convênio" },
                            { value: "particular", label: "Particular" },
                            // { value: "sus", label: "SUS" },
                            { value: "cortesia", label: "Contesia" },
                        ]}
                        valueLabel="Modo Recebimento"
                        labelWidthValue='w-2/5'
                        disabled={false}
                        campoRequired={inputRequired}
                    />
                    <Input
                        type="text"
                        value={razaoSocial}
                        onChange={(e) => setRazaoSocial(e.target.value)}
                        name="Razão Social"
                        placeholder="Razão Social"
                        valueLabel="Razão Social"
                        labelWidthValue='w-1/5'
                        campoRequired={inputRequired}
                    />
                    <Input
                        type="text"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        name="cnpj"
                        placeholder="CNPJ"
                        valueLabel="CNPJ"
                        labelWidthValue='w-1/5'
                        campoRequired={inputRequired}
                    />
                    {(opcao === "sus" || opcao === "convenio") && (
                        <>
                            <Input
                                type="text"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                name="Descrição"
                                placeholder="Descrição"
                                valueLabel="Descrição"
                                labelWidthValue='w-1/5'
                                campoRequired={inputRequired}
                            />
                            {/* <Input
                                type="text"
                                value={razaoSocial}
                                onChange={(e) => setRazaoSocial(e.target.value)}
                                name="Razão Social"
                                placeholder="Razão Social"
                                valueLabel="Razão Social"
                                labelWidthValue='w-1/5'
                                campoRequired={inputRequired}
                            /> */}
                            {/* <div>
                                <label htmlFor="" className="flex flex-col w-1/5 text-sm">
                                    CNPJ
                                </label>
                                <InputMask
                                    mask="99.999.999/9999-99"
                                    value={cnpj}
                                    onChange={(e) => setCnpj(e.target.value)}
                                    placeholder="Digite o CNPJ"
                                    className="bg-white border border-gray-300 p-[7px] rounded-md h-10"
                                    required={inputRequired}
                                />
                            </div> */}
                            <Input
                                type="text"
                                value={inscricaoEstatual}
                                onChange={(e) => setInscricaoEstadual(e.target.value)}
                                name="Inscrição Estadual"
                                placeholder="Inscrição Estadual"
                                valueLabel="Inscrição Estadual"
                                labelWidthValue='w-1/5'
                                campoRequired={inputRequired}
                            />
                        </>
                    )}
                </div>
                {(opcao === "sus" || opcao === "convenio") && (
                    <>
                        <div className="flex p-2 gap-4 items-center">
                            <Input
                                type="text"
                                value={inscricaoMunicipal}
                                onChange={(e) => setInscricaoMunicipal(e.target.value)}
                                name="Incrição Municipal"
                                placeholder="Inscrição Municipal"
                                valueLabel="Inscrição Municipal"
                                labelWidthValue='w-1/5'
                                campoRequired={inputRequired}
                            />
                            <label className="flex flex-col w-1/5 text-sm">
                                Telefone
                                <InputMask
                                    mask="(99) 9999-9999"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    name="telefone"
                                    placeholder="Telefone"
                                    className="bg-white border border-gray-300 p-2 rounded-md w-full h-10"
                                    required={inputRequired}
                                />
                            </label>
                            <label className="flex flex-col w-1/5 text-sm">
                                Contato
                                <InputMask
                                    mask="(99) 9999-9999"
                                    value={contato}
                                    onChange={(e) => setContato(e.target.value)}
                                    name="telefone"
                                    placeholder="Contato"
                                    className="bg-white border border-gray-300 p-2 rounded-md w-full h-10"
                                    required={inputRequired}
                                />
                            </label>
                            <Input
                                type="text"
                                value={site}
                                onChange={(e) => setSite(e.target.value)}
                                name="Site"
                                placeholder="Site"
                                valueLabel="Site"
                                labelWidthValue='w-1/5'
                                campoRequired={inputRequired}
                            />
                            <Input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="Email"
                                placeholder="Email"
                                valueLabel="Email"
                                labelWidthValue='w-1/5'
                                campoRequired={inputRequired}
                            />
                        </div>
                        <div className="flex p-2 gap-4 items-center">
                            <Input
                                type="text"
                                value={observacao}
                                onChange={(e) => setObservacao(e.target.value)}
                                name="Observação"
                                placeholder="Observação"
                                valueLabel="Observação"
                                labelWidthValue='w-1/5'
                                campoRequired={inputRequired}
                            />
                            <Select
                                value={procedimentos}
                                onChange={(e) => setProcedimentos(e.target.value)}
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
                                campoRequired={inputRequired}
                            />
                            <Select
                                value={medicamentos}
                                onChange={(e) => setMedicamentos(e.target.value)}
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
                                campoRequired={inputRequired}
                            />
                            <Select
                                value={taxas}
                                onChange={(e) => setTaxas(e.target.value)}
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
                                campoRequired={inputRequired}
                            />
                            <Select
                                value={materiais}
                                onChange={(e) => setMateriais(e.target.value)}
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
                                campoRequired={inputRequired}
                            />
                        </div>
                        <div className="flex p-2 gap-4 items-center">
                            <Input
                                type="number"
                                value={valorFilme}
                                onChange={(e) => setValorFilme(e.target.value)}
                                name="Valor Filme"
                                placeholder="Valor Filme"
                                valueLabel="Valor Filme"
                                labelWidthValue='w-1/5'
                                campoRequired={inputRequired}
                            />
                            <Input
                                type="date"
                                value={vencimentoContrato}
                                onChange={(e) => setVencimentoContrato(e.target.value)}
                                name="Vencimento Contrato"
                                placeholder="Vencimento Contrato"
                                valueLabel="Vencimento Contrato"
                                labelWidthValue='w-1/5'
                                campoRequired={inputRequired}
                            />
                            <Input
                                type="text"
                                value={tagImpressaoDeSaia}
                                onChange={(e) => setTagImpressaoDeSaia(e.target.value)}
                                name="Tag Impressão de Saia"
                                placeholder="Tag Impressão de Saia"
                                valueLabel="Tag Impressão de Saia"
                                labelWidthValue='w-1/5'
                                campoRequired={inputRequired}
                            />
                            <Input
                                type="text"
                                value={alertaFichaAtendimento}
                                onChange={(e) => setAlertaFichaAtendimento(e.target.value)}
                                name="alerta_ficha_atendimento"
                                placeholder="Alerta (Ficha de Atendimento)"
                                valueLabel="Alerta (Ficha de Atendimento)"
                                labelWidthValue='w-1/4'
                                campoRequired={inputRequired}
                            />
                        </div>
                    </>
                )}
                <div className="flex p-2 gap-4 items-center">
                    <Select
                        value={planoDeContas}
                        onChange={(e) => setPlanoDeContas(e.target.value)}
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
                    />
                    <Input
                        type="number"
                        value={diasRetornoEletivo}
                        onChange={(e) => setDiasRetornoEletivo(e.target.value)}
                        name="Dias Retorno Eletivo"
                        placeholder="Dias Retorno Eletivo"
                        valueLabel="Dias Retorno Eletivo"
                        labelWidthValue='w-1/5'
                    />
                    <Input
                        type="number"
                        value={diasRetornoEmergencia}
                        onChange={(e) => setDiasRetornoEmergencia(e.target.value)}
                        name="Dias Retorno Emerg"
                        placeholder="Dias Retorno Emerg."
                        valueLabel="Dias Retorno Emerg."
                        labelWidthValue='w-1/5'
                    />
                </div>
            </div>
            {(opcao === "sus" || opcao === "convenio") && (
                <div>
                    <h1>Endereço</h1>
                    <div className="flex p-2 gap-4 items-center">
                        <Input
                            type="text"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            name="Cidade"
                            placeholder="Cidade"
                            valueLabel="Cidade"
                            labelWidthValue='w-1/5'
                            campoRequired={inputRequired}
                        />
                        <label className="flex flex-col w-1/5 text-sm">
                            Cep
                            <InputMask
                                mask="99999-999"
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                                name="cep"
                                placeholder="Cep"
                                className="bg-white border border-gray-300 p-2 rounded-md w-full h-10"
                                required={inputRequired}
                            />
                        </label>
                        <Input
                            type="text"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            name="Estado"
                            placeholder="Estado"
                            valueLabel="Estado"
                            labelWidthValue='w-20'
                            campoRequired={inputRequired}
                        />
                        <Input
                            type="text"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            name="Numero"
                            placeholder="N°"
                            valueLabel="N°"
                            labelWidthValue='w-16'
                            campoRequired={inputRequired}
                        />
                        <Input
                            type="text"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            name="Endereço"
                            placeholder="Endereço"
                            valueLabel="Endereço"
                            labelWidthValue='w-1/5'
                            campoRequired={inputRequired}
                        />
                    </div>
                    <div className="flex p-2 gap-4 items-center">
                        <Input
                            type="text"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                            name="Complemento"
                            placeholder="Complemento"
                            valueLabel="Complemento"
                            labelWidthValue='w-1/5'
                            campoRequired={inputRequired}
                        />
                        <Input
                            type="text"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            name="Bairro"
                            placeholder="Bairro"
                            valueLabel="Bairro"
                            labelWidthValue='w-1/5'
                            campoRequired={inputRequired}
                        />
                    </div>
                </div>
            )}
            <ToastContainer />
            <Button onClick={sendRequest}>Cadastrar</Button>
        </div>
    );
};

export default CadastroConvenio;