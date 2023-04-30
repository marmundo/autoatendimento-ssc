import Botao from 'componentes/Botao';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/geral.css';
import './DadosUsuario.css';
export default function DadosUsuario({ usuario }) {

  const navegar = useNavigate();


  const navegarPara = useCallback(
    (path) => {
      navegar(path)
    }, [navegar]
  )
  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === "Enter") navegarPara('/leituraCartao')
    },
    [navegarPara]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <section className='container'>
      <div className='form'>
        <h1 id="titulo">Confirme Seus Dados</h1>
        <div className='foto-aluno'>
          <img src={usuario.foto} alt='foto usuario' />
        </div>
        <div className='dados-pessoais'>
          <div className='label' id='matricula'>
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
        </div>
        <div className='botoes'>
          <Botao onClick={() => navegarPara('/leituraCartao')}>
            Confirmar
          </Botao>
          <Botao onClick={() => navegarPara('/')}>
            Cancelar
          </Botao>
        </div>
      </div>
    </section>
  )
}
