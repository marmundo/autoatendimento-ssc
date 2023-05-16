import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { axiosPost } from "utils/utils";

export const UsuarioContext = createContext()
UsuarioContext.displayName = "Usuario"

export default function UsuarioProvider({ children }) {
  const [matricula, setMatricula] = useState('');
  const [token, setToken] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState('');
  const [cartao, setCartao] = useState('');


  return (
    <UsuarioContext.Provider
      value={{
        matricula, setMatricula, token, setToken, nome, setNome, email, setEmail, foto, setFoto, cartao, setCartao
      }}
    >
      <Outlet />
    </UsuarioContext.Provider>
  )
}

export const useUsuarioContext = () => {
  const { matricula, setMatricula, setToken, setNome, setEmail, setFoto } = useContext(UsuarioContext)

  async function loginSUAP(matricula, senha) {
    let autenticacaoURL = "https://suap.ifrn.edu.br/api/v2/autenticacao/token/"
    let dadosUsuario = { username: matricula, password: senha };

    let response = await axiosPost(autenticacaoURL, dadosUsuario)

    if (!response.status) {
      return false;
    } else {
      console.log("Login realizado com sucesso")
      let token = response.data.access
      return { 'status': true, 'token': token };
    }
  }
  async function getUserSUAPInformation(tempToken) {
    let headersList = {
      "Accept": "*/*",
      'Authorization': `Bearer ${tempToken}`
    }
    let response = await fetch("https://suap.ifrn.edu.br/api/v2/minhas-informacoes/meus-dados/", {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      const resposta = await response.json()
      console.log("Erro autenticação > ", resposta)
    } else {
      const resposta = await response.json()
      return { nome: resposta.vinculo.nome, email: resposta.email, foto: 'https://suap.ifrn.edu.br' + resposta.url_foto_150x200 }
    }
  }
  return {
    matricula, setMatricula, setToken, setNome, setEmail, setFoto, getUserSUAPInformation, loginSUAP
  }
}