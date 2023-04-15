import React from 'react'

import type { BaseComponent } from '@/types'
import { classNames } from '@/utils'

export type SvgIconProperties = BaseComponent &
  React.SVGProps<SVGSVGElement> & {
    /**
     * Node passed into the SVG element.
     */
    children?: React.ReactNode
    /**
     * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
     * @default 24
     */
    fontSize?: 'inherit' | number
    /**
     * Applies a color attribute to the SVG element.
     * @default 'inherit'
     */
    htmlColor?: string
    /**
     * The shape-rendering attribute. The behavior of the different options is described on the
     * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
     * If you are having issues with blurry icons you should investigate this prop.
     */
    shapeRendering?: string
    /**
     * Provides a human-readable title for the element that contains it.
     * https://www.w3.org/TR/SVG-access/#Equivalent
     */
    titleAccess?: string
    /**
     * Allows you to redefine what the coordinates without units mean inside an SVG element.
     * For example, if the SVG element is 500 (width) by 200 (height),
     * and you pass viewBox="0 0 50 20",
     * this means that the coordinates inside the SVG will go from the top left corner (0,0)
     * to bottom right (50,20) and each unit will be worth 10px.
     * @default '0 0 24 24'
     */
    viewBox?: string
  }

export function SvgIcons({
  children,
  className,
  htmlColor,
  titleAccess,
  fontSize = 24,
  viewBox = '0 0 24 24',
  ...properties
}: SvgIconProperties) {
  return (
    <svg
      className={classNames(
        'inline-block shrink-0 select-none',
        'w-[1em] h-[1em] fill-current text-2xl leading-none',
        className
      )}
      focusable="false"
      style={{
        color: htmlColor || 'inherit',
        fontSize: fontSize === 'inherit' ? 'inherit' : `${fontSize}px`,
      }}
      viewBox={viewBox}
      aria-hidden={titleAccess ? undefined : true}
      role={titleAccess ? 'img' : undefined}
      {...properties}
    >
      {children}
      {titleAccess ? <title>{titleAccess}</title> : undefined}
    </svg>
  )
}
