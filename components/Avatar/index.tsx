import type * as CSS from 'csstype'
import Image, { type StaticImageData } from 'next/image'

import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

type Size = 'small' | 'medium' | 'large'

type Variant = 'image' | 'text'

type AvatarProperties = BaseComponent & {
  src: string | StaticImageData
  alt?: string
  size?: Size
  color?: CSS.Property.BorderColor
  variant?: Variant
  onClick?: () => void
}

const sizes: Record<Size, string> = {
  small: 'w-11 h-11 border-2',
  medium: 'w-[62px] h-[62px] border-4',
  large: 'w-20 h-20 border-4',
}

const imgSizes: Record<Size, number> = {
  small: 44,
  medium: 62,
  large: 80,
}

const shadow: Record<Size, string> = {
  small: 'shadow-avatar-small drop-shadow-avatar-small',
  medium: 'shadow-avatar-medium drop-shadow-avatar-medium',
  large: 'shadow-avatar-large drop-shadow-avatar-large',
}

type EmptyAvatarProperties = Pick<
  AvatarProperties,
  'size' | 'alt' | 'className'
>

function EmptyAvatar(properties: EmptyAvatarProperties) {
  const { className, size = 'medium', alt = 'avatar' } = properties
  return (
    <span
      data-testid="empty-avatar"
      className={cn(
        'inline-block overflow-hidden rounded-full bg-gray-100',
        sizes[size],
        className
      )}
      aria-label={alt}
    >
      <svg
        className="h-full w-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  )
}

function ImageAvatar(properties: AvatarProperties) {
  const {
    className,
    size = 'medium',
    color = '#FFFFFF',
    alt = 'avatar',
    onClick,
    ...others
  } = properties
  return (
    <Image
      className={cn(
        'box-border inline-block rounded-full border-solid',
        sizes[size],
        shadow[size],
        onClick && 'cursor-pointer',
        className
      )}
      style={{ borderColor: color }}
      alt={alt}
      onClick={onClick}
      width={imgSizes[size]}
      height={imgSizes[size]}
      {...others}
    />
  )
}

type TextAvatarProperties = Omit<AvatarProperties, 'src'> & { src: string }
function TextAvatar(properties: TextAvatarProperties) {
  const {
    className,
    src,
    size = 'medium',
    color = '#FFFFFF',
    alt = 'avatar',
    onClick,
    ...others
  } = properties
  return (
    <div
      className={cn(
        'box-border flex content-center items-center justify-center rounded-full border-solid',
        'bg-iff-cyan text-3xl font-bold uppercase leading-10 text-black',
        sizes[size],
        shadow[size],
        onClick && 'cursor-pointer',
        className
      )}
      style={{ borderColor: color }}
      onClick={onClick}
      {...others}
      aria-label={alt}
    >
      {src.charAt(0)}
    </div>
  )
}

export function Avatar({
  variant = 'image',
  src,
  ...properties
}: AvatarProperties) {
  if (!src) return <EmptyAvatar {...properties} />

  if (variant === 'text' && typeof src === 'string')
    return <TextAvatar src={src} {...properties} />

  return <ImageAvatar src={src} {...properties} />
}
