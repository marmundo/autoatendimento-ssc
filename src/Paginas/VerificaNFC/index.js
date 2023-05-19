import CampoTexto from "componentes/CampoTexto";
import { useState } from "react";

export default function VerificaNFC() {

  const [cartao, setCartao] = useState([])
  const [cartaoTemp, setCartaoTemp] = useState('')
  const [cartaoTemp2, setCartaoTemp2] = useState('')

  let msg_tag_afirmacao = 'Este cartão pode ser utilizado'
  let msg_tag_negacao = 'Este cartão não pode ser utilizado'
  function verificaTagsIguais(tags) {
    if (1 === new Set(tags).size) {
      return true;
    }
    return false
  }
  return (
    <>
      <CampoTexto
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
            document.getElementById("cartao2").focus();
          }
        }} maxLength='8' />

      <CampoTexto id={'cartao2'}
        type="password"
        label={'Coloque seu Cartão no Leitor'}
        valor={cartaoTemp2}
        aoAlterado={cartaoTemp2 => {
          setCartaoTemp2(cartaoTemp2)
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setCartao([...cartao, cartaoTemp2])
          }
        }} maxLength='8' />


      {verificaTagsIguais([cartaoTemp, cartaoTemp2]) ? <div><p>{msg_tag_afirmacao}</p></div> : <div><p>{msg_tag_negacao}</p></div>}
    </>
  )
}
