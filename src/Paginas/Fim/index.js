import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Fim.css'
export default function Fim() {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }, [])

  return (
    <section className="container centro-tela">
      <div className="centro-tela">
        <h1>
          Obrigado!!!!
        </h1>
        <h2>
          Seu Cartão foi cadastro com sucesso!
        </h2>
      </div>
    </section>
  )
}
