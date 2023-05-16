import { useUsuarioContext } from "common/context/Usuario";
import Botao from "componentes/Botao";
import CampoTexto from "componentes/CampoTexto";
import 'css/geral.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validCartaoNFC } from "utils/Regex";
import './LeituraCartao.css';
export default function LeituraCartao() {

  const [cartaoErr, setCartaoErr] = useState(false)
  const [isButtonDisable, setIsButtonDisable] = useState(false);
  const navegar = useNavigate()

  const { cartao, setCartao, cadastrarUsuario } = useUsuarioContext()


  function navegarPara(path) {
    navegar(path)
  }

  function validaCartao() {
    if (!validCartaoNFC.test(cartao)) {
      setCartaoErr(true)
      return false
    }
    setCartaoErr(false)
    return true
  }
  return (
    <section className="container">
      <div className="form">
        <CampoTexto
          label={'Coloque seu Cartão no Leitor'}
          valor={cartao}
          aoAlterado={cartao => {
            setCartao(cartao)
          }}
          autoFocus
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              cadastrarUsuario()
            }
          }} maxLength='8' />
        <div className='botoes'>
          <Botao id='botao' disabled={isButtonDisable}
            onClick={async () => {
              if (validaCartao()) {
                setIsButtonDisable(true);
                let resposta = await cadastrarUsuario();
                navegar(resposta.msg)
              }
            }}
          >
            Cadastrar
          </Botao>
          <Botao onClick={() => navegarPara('/')}>
            Cancelar
          </Botao>
        </div>

        {cartaoErr && <div className="mensagem-erro"> <p>Seu cartão é inválido</p> <p>Insira novamente seu cartão!</p></div>}
      </div>
    </section >
  )
}
