export default function SectionHeading({ title, subtitle, centered = true }) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-navy mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-charcoal/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-16 bg-saffron rounded-full ${centered ? 'mx-auto' : ''}`} />
    </div>
  )
}
