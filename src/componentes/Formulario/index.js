import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import '../../css/geral.css';
import Botao from "../Botao";
import CampoTexto from "../CampoTexto";
import './Formulario.css';

const Formulario = (props) => {
  const [matricula, setMatricula] = useState('1725032');
  const [senha, setSenha] = useState('1725032');

  const limparCampos = () => {
    setMatricula('')
    setSenha('')
  }

  const navegar = useNavigate();
  const aoProximo = (evento) => {
    evento.preventDefault()
    let usuario = { matricula, senha }

    props.aoUsuarioCadastrado(usuario)
    limparCampos()
    navegar("/confereDadosUsuario")

  }
  return (
    <section className="container" onSubmit={aoProximo}>
      <form>
        <h1> {props.titulo}</h1>
        <h2> {props.subtitulo}</h2>

        <CampoTexto label="Matricula - SUAP" valor={matricula} aoAlterado={matricula => { setMatricula(matricula) }} />
        <CampoTexto label="Senha - SUAP" valor={senha} aoAlterado={senha => { setSenha(senha) }} />

        <Botao>
          Próximo
        </Botao>

      </form>
    </section>
  )
}
export default Formulario