import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Estado para exibir o spinner

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
          await axios.post(
            'https://sistema.clinicaacolherslz.com.br/api/logout',
            {},
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
        }
        // Remove dados do localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('usuarioLogado');

        // Mostra um toast de sucesso
        toast.success('Logout realizado com sucesso!', { position: 'bottom-right' });

        // Aguarda 2 segundos antes de redirecionar
        setTimeout(() => {
          setIsLoading(false); // Finaliza o loading
          navigate('/login');
        }, 2000);
      } catch (error) {
        //console.error('Erro ao fazer logout:', error);
        //toast.error('Erro ao realizar logout. Tente novamente.', { position: 'bottom-right' });
        setIsLoading(false);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500 border-t-transparent"></div>
          <span className="ml-2 text-gray-700">Realizando logout...</span>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Logout;
