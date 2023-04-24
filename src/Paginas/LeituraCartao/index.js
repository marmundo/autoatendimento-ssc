import Botao from "componentes/Botao";
import CampoTexto from "componentes/CampoTexto";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validCartaoNFC } from "utils/Regex";
import './LeituraCartao.css';

export default function LeituraCartao() {
  const [cartao, setCartao] = useState('12345678')
  const [cartaoErr, setCartaoErr] = useState(false)
  const navegar = useNavigate()

  function validaCartao() {
    console.log('00' + cartao)
    if (!validCartaoNFC.test('00' + cartao)) {
      setCartaoErr(true)
      return false
    }
    else {
      setCartaoErr(false)
      return true
    }
  }
  function cadastrarCartao() {
    if (validaCartao()) {
      let dadosjson = JSON.stringify({ cartao: '00' + cartao });
      // post('https://httpbin.org/post', dadosjson)
      navegarPara('/fim')
    }
  }

  function navegarPara(path) {
    navegar(path)
  }
  return (
    <section className="container">
      <div>
        <CampoTexto
          label={'Coloque seu Cartão no Leitor'}
          valor={cartao}
          aoAlterado={cartao => {
            setCartao(cartao)
          }}
          autoFocus
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              cadastrarCartao();
            }
          }} />
        <Botao id='botao' onClick={() => cadastrarCartao()} >
          Cadastrar
        </Botao>
        {cartaoErr && <div className="mensagem-erro"> <p>Seu cartão é inválido</p> <p>Insira novamente seu cartão!</p></div>}
      </div>
    </section >
  )
}
