import './CampoTexto.css'
function CheckBox({ label, checked, onChange }) {
  return (
    <div className='checkbox'>
      <input type="checkbox" id="checkbox" name="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor="checkbox">{label}</label>
    </div>
  )
}

export default CheckBox
