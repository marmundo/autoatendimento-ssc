import './CampoTexto.css'

const CampoTexto = (props) => {
  const aoDigitado = (evento) => {
    props.aoAlterado(evento.target.value)
  }
  return (
    <div className="campo-texto">
      <label>{props.label}</label>
      <input type={props.type} value={props.valor} onChange={aoDigitado} required={props.obrigatorio} placeholder={props.placeholder} autoFocus={props.autoFocus ? 'autoFocus' : ''}
        onKeyUp={props.onKeyUp} />
    </div>
  )
}

export default CampoTexto