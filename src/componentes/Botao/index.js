import { Tooltip } from "react-tooltip";
import './Botao.css';

const Botao = (props) => {
  return (
    <>
      <button
        data-tooltip-content={props.tooltip}
        data-tooltip-id={props.id}
        data-tooltip-place="top"
        onClick={props.onClick}
        className="botao"
        disabled={props.disabled}>
        {props.children}
      </button>
      <Tooltip id={props.id} />

    </>
  )
}

export default Botao