import Botao from "componentes/Botao";
import CampoTexto from "componentes/CampoTexto";
import { useState } from "react";
import { Link } from "react-router-dom";
import './VerificaNFC.css';

export default function VerificaNFC() {

  const [cartao, setCartao] = useState([])
  const [isCartao1On, setIisCartao1On] = useState(true)
  const [isCartao2On, setIisCartao2On] = useState(false)
  const [isMessageOn, setisMessageOn] = useState(false)
  const [cartaoTemp, setCartaoTemp] = useState('')
  const [cartaoTemp2, setCartaoTemp2] = useState('')

  let msg_tag_afirmacao = 'Este cartão pode ser utilizado'
  let msg_tag_negacao = 'Este cartão não pode ser utilizado'
  function verificaTagsIguais(tags) {
    if (1 === new Set(tags).size) {
      document.querySelector('.container .form').classList.add('message-passed')
      return true;
    }
    return false
  }
  return (
    <>
      {isCartao1On && <CampoTexto
        type="password"
        label={'Coloque seu Cartão no Leitor'}
        valor={cartaoTemp}
        aoAlterado={cartaoTemp => {
          setCartaoTemp(cartaoTemp)
        }}
        autoFocus
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setCartao([...cartao, cartaoTemp])
            setIisCartao1On(false)
            setIisCartao2On(true)
          }
        }} maxLength='8' />}

      {isCartao2On && <CampoTexto id={'cartao2'}
        type="password"
        label={'Coloque-o novamente'}
        valor={cartaoTemp2}
        autoFocus
        aoAlterado={cartaoTemp2 => {
          setCartaoTemp2(cartaoTemp2)
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setCartao([...cartao, cartaoTemp2])
            setisMessageOn(true)
            setIisCartao2On(false)
          }
        }} maxLength='8' />}


      {isMessageOn ?
        verificaTagsIguais([cartaoTemp, cartaoTemp2]) ?

          <div className="message message-passed" >
            <p>{msg_tag_afirmacao}</p>
          </div>

          :
          <div className="message message-no-passed"><p>{msg_tag_negacao}</p></div>
        : <></>
      }

      <Link to={'/'}>
        <Botao> Fechar </Botao>
      </Link>

    </>
  )
}
