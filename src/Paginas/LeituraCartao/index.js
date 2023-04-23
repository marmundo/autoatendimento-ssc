import Botao from "componentes/Botao";
import CampoTexto from "componentes/CampoTexto";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeituraCartao() {
  const [cartao, setCartao] = useState('123456789')
  const navegar = useNavigate()

  function cadastrarCartao() {
    let dadosjson = JSON.stringify({ cartao });
    // post('https://httpbin.org/post', dadosjson)
    navegarPara('/fim')
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
      </div>
    </section >
  )
}
