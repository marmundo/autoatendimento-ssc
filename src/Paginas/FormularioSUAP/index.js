import { useUsuarioContext } from "common/context/Usuario";
import Cabecalho from "componentes/Cabecalho";
import CheckBox from "componentes/CheckBox";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { validMatricula } from "utils/Regex";
import Botao from "../../componentes/Botao";
import CampoTexto from "../../componentes/CampoTexto";
import './FormularioSUAP.css';

const Formulario = (props) => {
  const { matricula, setMatricula, setToken, setNome, setEmail, setFoto, getUserSUAPInformation, loginSUAP } = useUsuarioContext()
  const [senha, setSenha] = useState('');
  const [matriculaErr, setMatriculaErr] = useState(false)
  const [lgpd, setLgpd] = useState(false)
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false)

  const navegar = useNavigate();

  const lgpdLabel = "Eu concordo que minhas informações aqui apresentadas sejam armazenadas por esse sistema de acordo com a legislação brasileira."



  async function aoProximo(evento) {

    evento.preventDefault()
    setIsButtonDisable(true)
    const resposta = await loginSUAP(matricula, senha)

    if (resposta.status) {
      let usuario = await getUserSUAPInformation(resposta.token)
      setToken(resposta.token)
      setNome(usuario.nome)
      setEmail(usuario.email)
      setFoto(usuario.foto)
      navegar("/confereDadosUsuario")
    } else {

      const titulo = "ERRO!!!";
      const subtitulo = "Seu usuário ou senha não foram digitados corretamente";

      navegar(`/mensagem?titulo=${titulo}&subtitulo=${subtitulo}`)
    }
  }

  // This function is triggered on the keyup event
  const checkCapsLock = (event) => {
    if (event.getModifierState('CapsLock')) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  function validarMatricula() {
    !validMatricula.test(matricula) ? setMatriculaErr(true) : setMatriculaErr(false)
  }
  return (
    <>

      <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />

      <CampoTexto label="Matrícula - SUAP" type="number" valor={matricula}
        aoAlterado={
          matricula => {
            setMatricula(matricula); validarMatricula()
          }}
        autoFocus required />
      {matriculaErr && <p className="mensagem-erro">Sua matrícula é inválida</p>}
      <CampoTexto type="password" label="Senha - SUAP" valor={senha} onKeyUp={(e) => {
        if (e.key === "Enter" && (!matriculaErr && lgpd)) {
          aoProximo(e);
        }
        checkCapsLock(e)
      }} aoAlterado={senha => { setSenha(senha) }} required />
      {/* Avisa ao usuario quando o caps lock está ativo */}
      {isCapsLockOn && <p className="mensagem-erro">CapsLock está ativo</p>}

      <CheckBox label={lgpdLabel} checked={lgpd} onChange={() => setLgpd(!lgpd)} />
      <Botao onClick={(e) => aoProximo(e)} disabled={(matriculaErr || !lgpd) || isButtonDisable}>
        Próximo
      </Botao>
    </>
  )
}
export default Formulario