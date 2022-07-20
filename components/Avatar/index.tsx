/* eslint-disable @next/next/no-img-element */
import type * as CSS from 'csstype'
import type { BaseComponent } from 'types'
import { classNames } from 'utils'

type Size = 'small' | 'medium' | 'large'

type Variant = 'image' | 'text'

type AvatarProps = BaseComponent & {
  src: string
  alt?: string
  size?: Size
  color?: CSS.Property.BorderColor
  variant?: Variant
  onClick?: () => void
}

const sizes: Record<Size, string> = {
  small: 'w-11 h-11 border-[1.5px]',
  medium: 'w-[62px] h-[62px] border-[3px]',
  large: 'w-20 h-20 border-[3px]',
}

const shadow: Record<Size, string> = {
  small: 'shadow-avatar-small drop-shadow-avatar-small',
  medium: 'shadow-avatar-medium drop-shadow-avatar-medium',
  large: 'shadow-avatar-large drop-shadow-avatar-large',
}

type EmptyAvatarProps = Pick<AvatarProps, 'size' | 'alt' | 'className'>

function EmptyAvatar(props: EmptyAvatarProps) {
  const { className, size = 'medium', alt = 'avatar' } = props
  return (
    <span
      data-testid="empty-avatar"
      className={classNames(
        'inline-block overflow-hidden bg-gray-100 rounded-full',
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

function ImageAvatar(props: AvatarProps) {
  const {
    className,
    size = 'medium',
    color = '#FFFFFF',
    alt = 'avatar',
    onClick,
    ...others
  } = props
  return (
    <img
      className={classNames(
        'inline-block box-border rounded-full border-solid',
        sizes[size],
        shadow[size],
        onClick && 'cursor-pointer',
        className
      )}
      style={{ borderColor: color }}
      alt={alt}
      onClick={onClick}
      {...others}
    />
  )
}

function TextAvatar(props: AvatarProps) {
  const {
    className,
    src,
    size = 'medium',
    color = '#FFFFFF',
    alt = 'avatar',
    onClick,
    ...others
  } = props
  return (
    <div
      className={classNames(
        'flex content-center items-center justify-center box-border rounded-full border-solid',
        'bg-iff-cyan font-bold text-3xl leading-10 text-black uppercase',
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

export function Avatar({ variant = 'image', src, ...props }: AvatarProps) {
  if (variant === 'text') return <TextAvatar src={src} {...props} />

  if (!src) return <EmptyAvatar {...props} />

  return <ImageAvatar src={src} {...props} />
}
