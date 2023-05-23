import { createContext, useContext, useState } from "react";
import { axiosPost } from "utils/utils";

const initialState = {
  matricula: '',
  token: '',
  nome: '',
  email: '',
  foto: '',
  cartao: '',
}

export const UsuarioContext = createContext(initialState)
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
      {children}
    </UsuarioContext.Provider>
  )
}

export const useUsuarioContext = () => {

  const { matricula, setMatricula, setToken, setNome, setEmail, setFoto, nome, token, cartao, setCartao } = useContext(UsuarioContext)
  const url = 'https://10.230.0.46/api/v2/autoatendimento'



  function montaPayload(cartao) {
    let payload = {}
    payload.nome = nome
    payload.registro = matricula
    payload.tag = cartao
    payload.token = token
    payload.vinculo = true
    return payload
  }


  async function cadastrarUsuario() {
    let payload = montaPayload(cartao.toUpperCase())
    console.log(payload)
    let response = await axiosPost(url, payload)

    if (!response.status) {
      const titulo = "ERRO!!!";
      let msg = `/mensagem?titulo=${titulo}&subtitulo=${response.msg}`
      return {
        msg
      }
    } else {
      const titulo = "Obrigado!!!"
      const subtitulo = "Seu cartão foi cadastrado com sucesso!"
      let msg = `/mensagem?titulo=${titulo}&subtitulo=${subtitulo}`
      return {
        msg: msg
      }
    }


  }

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
    nome, matricula, setMatricula, setToken, setNome, setEmail, setFoto, cartao, setCartao, getUserSUAPInformation, loginSUAP, cadastrarUsuario
  }
}