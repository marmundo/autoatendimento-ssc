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
      <div >
        <h1>Confirme Seus Dados</h1>
        <img src={usuario.foto} alt='foto usuario' />
        <div className='label'>
          <p className='bold'> Matrícula</p>
          <p>{usuario.matricula}</p>
        </div>
        <div className='label'>
          <p className='bold'>Nome</p>
          <p>{usuario.nome}</p>
        </div>
        <div className='label'>
          <p className='bold'>E-mail</p>
          <p>{usuario.email}</p>
        </div>

        <Botao onClick={() => navegarPara('/leituraCartao')}>
          Confirmar
        </Botao>
      </div>
    </section>
  )
}
