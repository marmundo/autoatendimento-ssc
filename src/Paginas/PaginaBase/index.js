import UsuarioProvider from 'common/context/Usuario'
import Container from 'componentes/Container'
import { Outlet } from 'react-router-dom'
import '../../css/geral.css'
export default function PaginaBase() {
  return (
    <UsuarioProvider>
      <Container>
        <Outlet />
      </Container>
    </UsuarioProvider>
  )
}
