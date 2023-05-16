
import UsuarioProvider from 'common/context/Usuario';
import DadosUsuario from 'paginas/DadosUsuario';
import Formulario from 'paginas/FormularioSUAP';
import LeituraCartao from 'paginas/LeituraCartao';
import PaginaMensagem from 'paginas/PaginaMensagem';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Router() {


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<UsuarioProvider />}>
          <Route path="/" element={
            <Formulario
              titulo={'Cadastro de Acesso ao IFRN-SGA'}
              subtitulo={'Utilize sua matrícula e senha SUAP'}
            />} />
          <Route path="confereDadosUsuario" element={<DadosUsuario />} />
          <Route path="leituraCartao" element={<LeituraCartao />} />
          <Route path="mensagem" element={<PaginaMensagem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
