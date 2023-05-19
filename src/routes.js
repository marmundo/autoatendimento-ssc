

import DadosUsuario from 'paginas/DadosUsuario';
import Formulario from 'paginas/FormularioSUAP';
import LeituraCartao from 'paginas/LeituraCartao';
import NaoEncontrada from 'paginas/NaoEncontrada';
import PaginaBase from 'paginas/PaginaBase';
import PaginaMensagem from 'paginas/PaginaMensagem';
import VerificaNFC from 'paginas/VerificaNFC';


import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Router() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaBase />}>
          <Route index element={
            <Formulario
              titulo={'Cadastro de Acesso ao IFRN-SGA'}
              subtitulo={'Utilize sua matrícula e senha SUAP'}
            />} />
          <Route path="confereDadosUsuario" element={<DadosUsuario />} />
          <Route path="leituraCartao" element={<LeituraCartao />} />
          <Route path="mensagem" element={<PaginaMensagem />} />
          <Route path="verifica-nfc" element={<VerificaNFC />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
