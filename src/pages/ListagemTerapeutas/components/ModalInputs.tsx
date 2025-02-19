import Input from '@/components/Input';
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import Select from '@/components/Select';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', // Ajuste a largura do modal
        height: '80%', // Ajuste a altura do modal
        zIndex: 1000, // Ajuste o z-index para garantir que o modal fique acima da sidebar
    },
    overlay: {
        zIndex: 999, // Ajuste o z-index do overlay para garantir que ele fique acima da sidebar
    },
};

interface ModalContainerProps {
    modalIsOpen: boolean;
    setModalIsOpen: (setModalIsOpen: boolean) => void;
    selectedTerapeuta: any;
    setSelectedTerapeuta: (terapeuta: any) => void;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    handleSave: () => void;
}

const ModalInputs: React.FC<ModalContainerProps> = ({
    modalIsOpen,
    setModalIsOpen,
    selectedTerapeuta,
    setSelectedTerapeuta,
    isEditing,
    setIsEditing,
    handleSave
}) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedTerapeuta((prevState: any) => ({
            ...prevState,
            usuario: {
                ...prevState.usuario,
                [name]: value,
            },
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedTerapeuta((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={customStyles}
            contentLabel="Detalhes do Terapeuta"
        >
            {selectedTerapeuta && (
                <div className="flex flex-col h-full justify-between">
                    <div>
                        <div className="flex p-2 gap-4">
                            <Input
                                type="text"
                                value={selectedTerapeuta.usuario.nome_completo}
                                onChange={handleInputChange}
                                name="nome_completo"
                                placeholder="Nome Completo"
                                valueLabel="Nome Completo"
                                labelWidthValue="w-1/5"
                                disabled={!isEditing}
                            />
                            <Input
                                type="text"
                                value={selectedTerapeuta.usuario.nome_social}
                                onChange={handleInputChange}
                                name="nome_social"
                                placeholder="Nome Social"
                                valueLabel="Nome Social"
                                labelWidthValue="w-1/5"
                                disabled={!isEditing}
                            />
                            <label className="flex flex-col w-1/7 text-sm">
                                CPF
                                <InputMask
                                    mask="999.999.999-99"
                                    value={selectedTerapeuta.usuario.cpf}
                                    onChange={handleInputChange}
                                    name="cpf"
                                    placeholder="CPF"
                                    className="bg-white border border-gray-300 p-2 rounded-md w-full"
                                    disabled={!isEditing}
                                />
                            </label>
                            <label className="flex flex-col w-1/7 text-sm">
                                RG
                                <InputMask
                                    mask="99.999.999-9"
                                    value={selectedTerapeuta.usuario.rg}
                                    onChange={handleInputChange}
                                    name="rg"
                                    placeholder="RG"
                                    className="bg-white border border-gray-300 p-2 rounded-md w-full"
                                    disabled={!isEditing}
                                />
                            </label>
                        </div>
                        <div className="flex p-2 gap-4">
                            <Input
                                type="email"
                                value={selectedTerapeuta.usuario.email}
                                onChange={handleInputChange}
                                name="email"
                                placeholder="E-mail"
                                valueLabel="E-mail"
                                labelWidthValue="w-1/5"
                                disabled={!isEditing}
                            />
                            <Select
                                value={selectedTerapeuta.usuario.sexo}
                                onChange={handleInputChange}
                                name="sexo"
                                options={[
                                    { value: "", label: "Selecione uma opção" },
                                    { value: "Masculino", label: "Masculino" },
                                    { value: "Feminino", label: "Feminino" },
                                ]}
                                valueLabel="Sexo"
                                disabled={!isEditing}
                            />
                            <label className="flex flex-col w-1/7 text-sm">
                                Telefone
                                <InputMask
                                    mask="(99) 99999-9999"
                                    value={selectedTerapeuta.usuario.telefone}
                                    onChange={handleInputChange}
                                    name="telefone"
                                    placeholder="Telefone"
                                    className="bg-white border border-gray-300 p-2 rounded-md w-full"
                                    disabled={!isEditing}
                                />
                            </label>
                            <label className="flex flex-col w-1/7 text-sm">
                                Celular
                                <InputMask
                                    mask="(99) 9 9999-9999"
                                    value={selectedTerapeuta.usuario.celular}
                                    onChange={handleInputChange}
                                    name="celular"
                                    placeholder="Celular"
                                    className="bg-white border border-gray-300 p-2 rounded-md w-full"
                                    disabled={!isEditing}
                                />
                            </label>
                            <Input
                                type="date"
                                value={selectedTerapeuta.usuario.data_nascimento}
                                onChange={handleInputChange}
                                name="data_nascimento"
                                placeholder="Nascimento"
                                valueLabel="Nascimento"
                                labelWidthValue="w-1/6"
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="flex p-2 gap-4">
                            <Select
                                value={selectedTerapeuta.regime_trabalhista}
                                onChange={handleSelectChange}
                                name="regime_trabalhista"
                                options={[
                                    { value: "", label: "Selecione uma opção" },
                                    { value: "0", label: "CLT" },
                                    { value: "1", label: "PJ" },
                                ]}
                                valueLabel="Regime de trabalho"
                                disabled={!isEditing}
                            />
                            <Input
                                type="number"
                                value={selectedTerapeuta.carga_horaria.toString()}
                                onChange={handleInputChange}
                                name="carga_horaria"
                                placeholder="Carga horária"
                                valueLabel="Carga horária"
                                labelWidthValue="w-1/6"
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="">
                        <button
                            onClick={isEditing ? handleSave : handleEditToggle}
                            className={`text-white px-4 py-2 rounded mt-4 ${isEditing ? 'bg-green-500' : 'bg-yellow-500'}`}
                        >
                            {isEditing ? "Salvar" : "Editar"}
                        </button>
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    )
}

export default ModalInputs;