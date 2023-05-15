import Formulario from 'componentes/Formulario';
import DadosUsuario from 'paginas/DadosUsuario';
import LeituraCartao from 'paginas/LeituraCartao';
import PaginaMensagem from 'paginas/PaginaMensagem';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {

  const [usuario, setUsuario] = useState({})
  const salvarUsuario = (usuario) => {
    setUsuario(usuario)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Formulario
            titulo={'Cadastro de Acesso ao IFRN-SGA'}
            subtitulo={'Utilize sua matrícula e senha SUAP'}
            aoUsuarioCadastrado={usuario => salvarUsuario(usuario)} />} />
        <Route path="/confereDadosUsuario" element={<DadosUsuario usuario={usuario} />} />
        <Route path="/leituraCartao" element={<LeituraCartao usuario={usuario} />} />
        <Route path="/mensagem" element={<PaginaMensagem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
