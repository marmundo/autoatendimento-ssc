import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import '../../css/geral.css';
import Botao from "../Botao";
import CampoTexto from "../CampoTexto";
import './Formulario.css';

const Formulario = (props) => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');

  const limparCampos = () => {
    setMatricula('')
    setSenha('')
  }

  let usuario = {
    matricula: '',
    token: '',
    nome: '',
    email: '',
    foto: ''
  }

  async function loginSUAP() {
    let autenticacaoURL = "https://suap.ifrn.edu.br/api/v2/autenticacao/token/"
    let dadosjson = JSON.stringify({ username: matricula, password: senha });

    const response = await fetch(autenticacaoURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dadosjson,
    })
    if (!response.ok) {
      const resposta = await response.json()
      return false;
    } else {
      console.log("Login realizado com sucesso")
      const resposta = await response.json()
      const token = resposta.access
      usuario = { matricula, senha, token }
      return true;
    }
  }

  async function getUserInformation() {

    let headersList = {
      "Accept": "*/*",
      'Authorization': `Bearer ${usuario.token}`
    }

    let response = await fetch("https://suap.ifrn.edu.br/api/v2/minhas-informacoes/meus-dados/", {
      method: "GET",
      headers: headersList
    });

    if (!response.ok) {
      const resposta = await response.json()
      console.log(resposta)
    } else {

      const resposta = await response.json()
      console.log(resposta)
      usuario.nome = resposta.nome_usual
      usuario.email = resposta.email
      usuario.foto = 'https://suap.ifrn.edu.br' + resposta.url_foto_150x200
      return usuario
    }

  }
  const navegar = useNavigate();

  async function aoProximo(evento) {
    evento.preventDefault()
    const resposta = await loginSUAP()
    console.log(resposta)
    if (resposta) {
      const usuario = await getUserInformation()
      props.aoUsuarioCadastrado(usuario)
      limparCampos()
      navegar("/confereDadosUsuario")
    } else {
      navegar("/erro")
    }
  }
  return (
    <section className="container" onSubmit={aoProximo}>
      <form>
        <h1> {props.titulo}</h1>
        <h2> {props.subtitulo}</h2>

        <CampoTexto label="Matricula - SUAP" valor={matricula} aoAlterado={matricula => { setMatricula(matricula) }} />
        <CampoTexto type="password" label="Senha - SUAP" valor={senha} aoAlterado={senha => { setSenha(senha) }} />

        <Botao>
          Próximo
        </Botao>

      </form>
    </section>
  )
}
export default Formulario