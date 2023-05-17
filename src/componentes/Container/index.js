import 'css/geral.css'
export default function Container({ children }) {
  return (
    <section className="container" >
      <div className="form">
        {children}
      </div>
    </section >
  )
}