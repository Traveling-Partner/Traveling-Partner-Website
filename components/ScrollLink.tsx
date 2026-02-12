'use client'

import Link from 'next/link'

interface ScrollLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function ScrollLink({ href, children, className }: ScrollLinkProps) {
  const scrollToTop = (): void => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <Link href={href} onClick={scrollToTop} className={className}>
      {children}
    </Link>
  )
}