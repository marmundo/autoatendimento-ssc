

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PaginaMensagem.css';
export default function PaginaMensagem() {
  const [searchParams, setSearchParams] = useSearchParams();
  const REDIRECT_URL = '/'
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate(REDIRECT_URL)
    }, 3000)
  }, [navigate])
  return (
    <section className="container centro-tela">
      <div className="centro-tela">
        <h1>
          {searchParams.get('titulo')}
        </h1>
        <h2>
          {searchParams.get('subtitulo')}
        </h2>
      </div>
    </section>
  )
}
