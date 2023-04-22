import Botao from "componentes/Botao";
import CampoTexto from "componentes/CampoTexto";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeituraCartao() {
  const [cartao, setCartao] = useState('')
  const navegar = useNavigate()
  function navegarPara(path) {
    navegar(path)
  }
  return (
    <section className="container">
      <div>
        <CampoTexto label={'Coloque seu Cartão no Leitor'} valor={cartao} aoAlterado={cartao => {
          setCartao(cartao)
        }} autoFocus />
        <Botao onClick={() => navegarPara('/fim')} >
          Cadastrar
        </Botao>
      </div>
    </section >
  )
}
