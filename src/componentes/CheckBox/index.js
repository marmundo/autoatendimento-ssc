
function CheckBox({ label, checked, onChange }) {
  return (
    <div>
      <input type="checkbox" id="checkbox" name="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor="checkbox">{label}</label>
    </div>
  )
}

export default CheckBox
