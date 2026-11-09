import { Link } from 'react-router-dom'

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary: 'bg-saffron text-white hover:bg-saffron-dark focus:ring-saffron',
    secondary: 'bg-green text-white hover:bg-green-dark focus:ring-green',
    outline: 'border-2 border-saffron text-saffron hover:bg-saffron hover:text-white focus:ring-saffron',
    'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-navy focus:ring-white',
    ghost: 'text-saffron hover:bg-saffron/5 focus:ring-saffron',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
