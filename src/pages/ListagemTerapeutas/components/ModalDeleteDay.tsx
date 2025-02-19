import Modal from 'react-modal';


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

interface ModalDeleteDayProps {
    removeDateModalOpen: boolean;
}

const ModalDeleteDay: React.FC<ModalDeleteDayProps> = ({ removeDateModalOpen }) => {
  return (
    <div>
        <Modal
            isOpen={removeDateModalOpen}
            style={customStyles}
            contentLabel="Horários do Terapeuta"
        >
            
        
        </Modal>
    </div>
  )
}

export default ModalDeleteDay