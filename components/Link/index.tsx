import React from 'react'

interface ExternalLinkProperties {
  to?: string
  blank?: boolean
  className?: string
  title?: string
}

export function ExternalLink(
  properties: React.PropsWithChildren<ExternalLinkProperties>,
) {
  const { children, className, to, blank, title } = properties
  const target = blank ? '_blank' : undefined
  const relationship = blank ? 'noopener' : undefined
  return (
    <React.Fragment>
      {to && (
        <a
          className={className}
          href={to}
          target={target}
          rel={relationship}
          title={title}
        >
          {children}
        </a>
      )}
      {!to && (
        <span className={className} title={title}>
          {children}
        </span>
      )}
    </React.Fragment>
  )
}
