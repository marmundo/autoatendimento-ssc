import './CampoTexto.css'

const CampoTexto = (props) => {
  const aoDigitado = (evento) => {
    props.aoAlterado(evento.target.value)
  }
  return (
    <div className="campo-texto" >
      <label>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        value={props.valor}
        onChange={aoDigitado}
        required={props.required}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus ? 'autoFocus' : ''}
        onKeyUp={props.onKeyUp}
        pattern={props.pattern}
        maxLength={props.maxLength}
      />
    </div>
  )
}

export default CampoTexto