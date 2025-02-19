
import { SidebarTrigger } from "../ui/sidebar";
import Navbar from "../NavBar";
import navOptions from "../../data/navOptions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HeaderProps {
  isMobile?: boolean;
}

//const userData = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
//const userName = userData?.nome_completo || 'Usuário'; // Substitua 'nome_completo' pelo campo correto do seu JSON

export default function Header({ isMobile = false }: HeaderProps) {

  // Função de logout
  // const handleLogout = async () => {
  //   try {
  //     const authToken = localStorage.getItem('authToken');

  //     // Faz a chamada para o endpoint de logout
  //     await axios.post(
  //       'https://sistema.clinicamultihabilit.com.br/api/logout',
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );

  //     // Remove os dados do localStorage
  //     localStorage.removeItem('usuarioLogado');
  //     localStorage.removeItem('authToken');

  //     // Exibe o toast de sucesso
  //     toast.success("Logout realizado com sucesso!", { position: "bottom-right" });

  //     // Aguarda 2 segundos antes de redirecionar
  //     setTimeout(() => {
  //       navigate('/login');
  //     }, 2000);
  //   } catch (error) {
  //     if (axios.isAxiosError(error) && error.response?.status === 401) {
  //       toast.error('Sessão expirada. Você será redirecionado para o login.', {
  //         position: 'bottom-right',
  //       });
  //       navigate('/login');
  //     } 
  //     console.error("Erro ao realizar logout:", error);
  //     toast.error("Erro ao realizar logout. Tente novamente.", { position: "bottom-right" });
  //   }
  // };

  // const data = {
  //   menuUserMain: [
  //     {
  //       title: "Sair",
  //       Icon: LuLogOut,
  //       onClick: handleLogout, // Chama a função de logout
  //     },
  //   ],
  // };

  return (
    <>
      <header className=" w-full top-0 left-0 flex h-14 bg-white items-center justify-between px-4 z-10">
        <section className="flex items-center">
          {isMobile && <SidebarTrigger />}
          {/* <Logo /> */}
        </section>
        {!isMobile && <Navbar navOptions={navOptions} />}
        <section className="flex items-center gap-4 relative z-50 bg-red-300">
          {/* <ButtonPopup type="little" Icon={LuBell} tooltip="Notificações">
            <p className="text-zinc-700 p-3">Sem notificações. 😊</p>
          </ButtonPopup> */}
          {/* <ButtonPopup Icon={LuUserCircle}>
            <div className="p-3">
              <section className="flex flex-col items-center gap-3 mb-3">
                <h3 className="text-blue-500">Olá, {userName}</h3>
              </section>
              <hr /> */}
              {/* <section className="mt-3"> */}
                {/* Passa os links personalizados para MenuLinks */}
                {/* <MenuLinks links={data.menuUserMain} /> */}
              {/* </section>
            </div>
          </ButtonPopup> */}
        </section>
      </header>
      {/* Contêiner para exibir os toasts */}
      <ToastContainer />
    </>
  );
}
