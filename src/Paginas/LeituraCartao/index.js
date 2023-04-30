import Botao from "componentes/Botao";
import CampoTexto from "componentes/CampoTexto";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validCartaoNFC } from "utils/Regex";
import { post } from "utils/utils";
import '../../css/geral.css';
import './LeituraCartao.css';

export default function LeituraCartao({ usuario }) {
  const [cartao, setCartao] = useState('')
  const [cartaoErr, setCartaoErr] = useState(false)
  const navegar = useNavigate()

  const url = 'https://10.230.0.46/api/v2/autoatendimento'


  function validaCartao(cartaoTemp) {
    if (!validCartaoNFC.test(cartaoTemp)) {
      setCartaoErr(true)
      return false
    }
    else {
      setCartaoErr(false)
      return true
    }
  }

  function montaPayload(usuario, cartao) {
    let payload = {}
    payload.nome = usuario.nome
    payload.registro = usuario.matricula
    payload.tag = cartao
    payload.token = usuario.token
    payload.vinculo = true
    return JSON.stringify(payload)
  }

  async function cadastrarUsuario(usuario) {
    let cartaoTemp = salvarCartao()
    let payload = montaPayload(usuario, cartaoTemp)
    let resposta = await post(url, payload)
    if (resposta.status) {
      const titulo = "Obrigado!!!"
      const subtitulo = "Seu cartão foi cadastrado com sucesso!"
      navegarPara(`/mensagem?titulo=${titulo}&subtitulo=${subtitulo}`)
    } else {
      const titulo = "ERRO!!!";
      navegar(`/mensagem?titulo=${titulo}&subtitulo=${resposta.msg}`)
    }
  }

  function salvarCartao() {
    let cartaoTemp = cartao
    if (cartao.length === 8) {
      setCartao('00' + cartao)
      cartaoTemp = '00' + cartao
    }
    if (validaCartao(cartaoTemp)) {
      return cartaoTemp;
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
              cadastrarUsuario(usuario)
            }
          }} />
        <div className='botoes'>
          <Botao id='botao' onClick={() => cadastrarUsuario(usuario)} >
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
