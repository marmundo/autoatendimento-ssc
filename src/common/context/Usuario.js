import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const UsuarioContext = createContext()
UsuarioContext.displayName = "Usuario"

export default function UsuarioProvider({ children }) {
  const [matricula, setMatricula] = useState('');
  const [token, setToken] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState('');
  const [cartao, setCartao] = useState('');


  return (
    <UsuarioContext.Provider
      value={{
        matricula, setMatricula, token, setToken, nome, setNome, email, setEmail, foto, setFoto, cartao, setCartao
      }}
    >
      <Outlet />
    </UsuarioContext.Provider>
  )
}