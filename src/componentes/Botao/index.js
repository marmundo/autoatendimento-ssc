import './Botao.css'
const Botao = (props) => {
  console.log(props.disabled)
  return (
    <button onClick={props.onClick} className="botao" disabled={props.disabled}>
      {props.children}
    </button>
  )
}

export default Botao