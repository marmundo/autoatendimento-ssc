import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Fim.css'
export default function Fim({ titulo, subtitulo }) {
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
          {titulo}
        </h1>
        <h2>
          {subtitulo}
        </h2>
      </div>
    </section>
  )
}
