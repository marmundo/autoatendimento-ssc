import { UsuarioContext } from 'common/context/Usuario';
import Botao from 'componentes/Botao';
import 'css/geral.css';
import { useCallback, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DadosUsuario.css';
export default function DadosUsuario() {
  const { foto, matricula, nome, email } = useContext(UsuarioContext);

  const navegar = useNavigate();

  const navegarPara = useCallback(
    (path) => {
      navegar(path)
    }, [navegar]
  )
  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === "Enter")
        navegarPara('/leituraCartao')
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
    <>
      <h1 id="titulo">Confirme Seus Dados</h1>
      <div className='foto-aluno'>
        <img src={foto} alt='foto usuario' />
      </div>
      <div className='dados-pessoais'>
        <div className='label' id='matricula'>
          <p className='bold'> Matrícula</p>
          <p>{matricula}</p>
        </div>
        <div className='label'>
          <p className='bold'>Nome</p>
          <p>{nome}</p>
        </div>
        <div className='label'>
          <p className='bold'>E-mail</p>
          <p>{email}</p>
        </div>
      </div>
      <div className='botoes'>
        <Link to={'/leituraCartao'}>
          <Botao>
            Confirmar
          </Botao>
        </Link>
        <Link to={'/'}>
          <Botao >
            Cancelar
          </Botao>
        </Link>
      </div>
    </>
  )
}
