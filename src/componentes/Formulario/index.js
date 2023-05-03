import CheckBox from "componentes/CheckBox";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { validMatricula } from "utils/Regex";
import '../../css/geral.css';
import Botao from "../Botao";
import CampoTexto from "../CampoTexto";
import './Formulario.css';


const Formulario = (props) => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [matriculaErr, setMatriculaErr] = useState(false)
  const [lgpd, setLgpd] = useState(false)
  const [bool, setBool] = useState(true);

  const lgpdLabel = "Eu concordo que minhas informações aqui apresentadas sejam armazenadas por esse sistema de acordo com a legislação brasileira"


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
      console.log("Erro autenticação > ", resposta)
    } else {
      const resposta = await response.json()
      usuario.nome = resposta.vinculo.nome
      usuario.email = resposta.email
      usuario.foto = 'https://suap.ifrn.edu.br' + resposta.url_foto_150x200
      return usuario
    }

  }
  const navegar = useNavigate();

  async function aoProximo(evento) {
    evento.preventDefault()
    const resposta = await loginSUAP()
    setBool(resposta.length > 0)
    if (resposta) {
      const usuario = await getUserInformation()
      props.aoUsuarioCadastrado(usuario)
      limparCampos()
      navegar("/confereDadosUsuario")
    } else {

      const titulo = "ERRO!!!";
      const subtitulo = "Seu usuário ou senha não foram digitados corretamente";

      navegar(`/mensagem?titulo=${titulo}&subtitulo=${subtitulo}`)
    }
  }

  function validarMatricula() {
    !validMatricula.test(matricula) ? setMatriculaErr(true) : setMatriculaErr(false)
  }
  return (
    <section className="container" onSubmit={aoProximo}>
      <form>
        <h1> {props.titulo}</h1>
        <h2> {props.subtitulo}</h2>

        <CampoTexto maxlength="14" label="Matricula - SUAP" type="number" valor={matricula}
          aoAlterado={
            matricula => {
              setMatricula(matricula); validarMatricula()
            }
          } required />
        {matriculaErr && <p className="mensagem-erro">Sua matrícula é inválida</p>}
        <CampoTexto type="password" label="Senha - SUAP" valor={senha} onKeyUp={(e) => {
          if (e.key === "Enter" && !matriculaErr) {
            aoProximo(e);
          }
        }} aoAlterado={senha => { setSenha(senha) }} required />

        <CheckBox label={lgpdLabel} checked={lgpd} onChange={() => setLgpd(!lgpd)} />
        <Botao disabled={(matriculaErr || !lgpd) && bool}>
          Próximo
        </Botao>

      </form>
    </section>
  )
}
export default Formulario