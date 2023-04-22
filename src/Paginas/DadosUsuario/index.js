import Botao from 'componentes/Botao';
import { useNavigate } from 'react-router-dom';
import '../../css/geral.css';
import './DadosUsuario.css';
export default function DadosUsuario({ usuario }) {
  const navegar = useNavigate();

  function navegarPara(path) {
    navegar(path)
  }

  return (
    <section className='container'>
      <div className='dados-usuario'>
        <h1 > Matrícula</h1>
        <h2>{usuario.matricula}</h2>
        <h1>Senha</h1>
        <h2>{usuario.senha}</h2>
        <Botao onClick={navegarPara('/leituraCartao')}>
          Confirmar
        </Botao>
      </div>
    </section>
  )
}
