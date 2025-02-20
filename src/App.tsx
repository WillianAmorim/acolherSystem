import Agenda from './pages/Agenda';
import {LoginPage} from './pages/Login/index';
import Agendamento from './pages/Agendamento/index'
import { Routes, Route, Navigate } from 'react-router-dom';
// import CadastroUsuario from './pages/CadastroUsuario/index';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import Consultas from './pages/Consultas/intex';
import Convenios from './pages/Convenios/index';
import Medicos from './pages/Medicos';
import CadastroMedico from './pages/Medicos/cadastro';
import { Outlet } from 'react-router-dom';
import Logout from './utils/Logout';
// import ListagemPacientes from './pages/CadastroPaciente/ListagemPaciente';
import Profile from './pages/Profile';
// import UsuarioDetalhes from './pages/CadastroUsuario/DetalhesUsuario';
// import UsuariosTable from './pages/CadastroUsuario/components/UsuariosTable';
import CadastroConvenio from './pages/CadastroConvenio';
import ConvenioDetails from "./pages/ConvenioDetails";
import Procedimentos from './pages/Procedimentos';
import CadastroPaciente from './pages/CadastroPaciente'
import CadastroTerapeuta from './pages/CadastroTerapeuta'
import ListagemTerapeutas from './pages/ListagemTerapeutas';
import ListagemPacientes from './pages/ListagemPacientes';
import AgendaSemanal from './pages/AgendaSemanal';
import Financeiro from './pages/Financeiro';
import Faturamento from './pages/Faturamento';
import Despesas from './pages/Despesas';
import CadastroUsuario from './pages/CadastroUsuario'

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? element : <Navigate to="/login" />;
};

// Layout Wrapper para rotas protegidas
const LayoutWrapper = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<Logout />} />

      {/* Rotas protegidas: renderizadas dentro do MainLayout */}
      <Route element={<LayoutWrapper />}>
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        {/* <Route path="/usuarios" element={<UsuariosTable />} /> */}
        {/* <Route path="/usuarios/:id" element={<UsuarioDetalhes />} /> */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        {/* <Route path="/cadastro" element={<ProtectedRoute element={<CadastroUsuario />} />} /> */}
        <Route path="/agenda-geral" element={<ProtectedRoute element={<Agenda />} />} />
        <Route path="/pacientes" element={<ProtectedRoute element={<Pacientes />} />} />
        <Route path="/procedimentos" element={<ProtectedRoute element={<Procedimentos />} />} />
        {/* <Route path="/pacientes/cadastro" element={<ProtectedRoute element={<ListagemPacientes />} />} /> */}
        {/* <Route path="/cadastro-paciente" element={<ProtectedRoute element={<ListagemPacientes />} />} /> */}
        <Route path="/consultas" element={<ProtectedRoute element={<Consultas />} />} />
        {/* <Route path="/terapeutas" element={<ProtectedRoute element={<Terapeutas />} />} /> */}
        
        <Route path="/terapeutas" element={<ProtectedRoute element={<Medicos />} />} />
        <Route path="/medicos/cadastro" element={<ProtectedRoute element={<CadastroMedico />} />} />
        {/* <Route path="/convenios" element={<ProtectedRoute element={<Convenios />} />} /> */}
        <Route path='/agendamento' element={<Agendamento />} />
        {/* <Route path='/cadastro-convenio' element={<CadastroConvenio />} /> */}
        <Route path="/convenios/:id" element={<ConvenioDetails />} />

        {/* ROTAS DE CADASTRO WILLIAN */}
        <Route path='/cadastro-paciente' element={<CadastroPaciente />} />
        <Route path='/cadastro-terapeuta' element={<CadastroTerapeuta />} />
        <Route path='/listagem-terapeutas' element={<ListagemTerapeutas />} />
        <Route path='/listagem-pacientes' element={<ListagemPacientes />} />
        <Route path='/cadastro-convenio' element={<CadastroConvenio />} />
        <Route path='/agenda-semanal' element={<AgendaSemanal />} />
        <Route path='/financeiro' element={<Financeiro />} />
        <Route path='/faturamento' element={<Faturamento />} />
        <Route path='/despesas' element={<Despesas />} />
        <Route path='/cadastro-usuario' element={<CadastroUsuario />} />
        <Route path="/convenios" element={<ProtectedRoute element={<Convenios />} />} />

      </Route>

        {/* Redireciona qualquer rota não especificada para login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
};

export default App;
