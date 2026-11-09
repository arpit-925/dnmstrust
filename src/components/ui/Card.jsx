export default function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`bg-white rounded-xl border border-border p-6 ${
        hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
