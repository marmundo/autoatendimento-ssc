import Botao from 'componentes/Botao'
import 'css/geral.css'
import { Link } from 'react-router-dom'
export default function Container({ children }) {
  return (
    <section className="container" >
      <div id="verifica-nfc">
        <Link to={'/verifica-nfc'}>
          <Botao>Verificação de Cartão</Botao>
        </Link>
      </div>
      <div className="form">
        {children}
      </div>
    </section >
  )
}