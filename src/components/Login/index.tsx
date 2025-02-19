import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Logo from "../../components/Logo";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsLoading(true); // Ativar o estado de carregamento

        try {
            // Realiza o login
            const loginResponse = await axios.post('https://sistema.clinicamultihabilit.com.br/api/login', {
                email,
                password,
            });

            const token = loginResponse.data.token;
            localStorage.setItem('authToken', token);

            // Configura o token no cabeçalho para requisições futuras
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Busca os dados do usuário
            const userResponse = await axios.get('https://sistema.clinicamultihabilit.com.br/api/me');
            const userData = userResponse.data;

            // Salva os dados do usuário no localStorage
            localStorage.setItem('usuarioLogado', JSON.stringify(userData));

            toast.success("Login bem sucedido!", { position: "bottom-right" });
            //setTimeout(() => , 1500); // Aguarde 1,5 segundos para mostrar o toast
            navigate('/dashboard');
        } catch (err) {
            // Captura o erro e exibe uma mensagem ao usuário
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                toast.error('Sessão expirada. Você será redirecionado para o login.', {
                  position: 'bottom-right',
                });
                navigate('/login');
              } 
            toast.error("Email ou senha inválido", { position: "bottom-right" });
        } finally {
            setIsLoading(false); // Desativar o estado de carregamento
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center w-full">
                    <Logo className=" " />
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#084E6F]"
                            placeholder="Digite seu email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#084E6F]"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-3 rounded-md text-white ${
                            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#084E6F] hover:bg-[#54719C]'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white mx-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        ) : (
                            'Entrar'
                        )}
                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
};

export default Login;
