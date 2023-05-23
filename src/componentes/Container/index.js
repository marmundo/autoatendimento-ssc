import Botao from 'componentes/Botao'
import 'css/geral.css'
import { Link } from 'react-router-dom'
export default function Container({ children }) {
  return (
    <section className="container" >
      <div id="verifica-nfc">
        <Link to={'/verifica-nfc'}>
          <Botao id="testar-cartao" tooltip='Use esta ferramenta para verificar se o seu cartão pode ser utilizado no sistema.' >Testar Cartão</Botao>
        </Link>
      </div>
      <div className="form">
        {children}
      </div>
    </section >
  )
}