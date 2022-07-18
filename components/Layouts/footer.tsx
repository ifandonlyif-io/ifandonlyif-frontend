import React from 'react'
import { BaseComponent } from 'types'
import { classNames } from 'utils'

type FooterProps = BaseComponent

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={classNames(
        'h-[312px] bg-[#442112]/30 shadow-iff-base backdrop-blur-[69px]',
        className
      )}
    >
      <p
        className={classNames(
          'pt-[92px] mb-3 text-center text-[#DAFFFF] heading-4 text-shadow-heading-2',
          'md:pt-20 md:mb-0 md:heading-2'
        )}
      >
        Effortless Abcdefg
      </p>
      <p className="text-center text-[18px] font-bold leading-normal text-white md:text-[22px]">
        Do the things you do, but better!
      </p>
    </footer>
  )
}
