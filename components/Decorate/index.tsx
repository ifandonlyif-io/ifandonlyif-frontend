import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

type NeonColor = 'cyan' | 'purple'

type NeonComponent = BaseComponent & {
  color?: NeonColor
}

const dropShadowNeon: Record<NeonColor, string> = {
  cyan: 'drop-shadow-neon-cyan',
  purple: 'drop-shadow-neon-purple',
}

const neonCornerColor: Record<NeonColor, string> = {
  cyan: 'bg-iff-cyan/80',
  purple: 'bg-[#BAB9FF]/90',
}
export function NeonCorner({ className, color = 'cyan' }: NeonComponent) {
  return (
    <div className={cn('h-[47px] w-14', dropShadowNeon[color], className)}>
      <div
        className={cn(
          'clip-path-corner h-full w-full bg-gradient-to-r from-[#C4C4C4] to-[#C4C4C4] bg-blend-multiply',
          neonCornerColor[color]
        )}
      />
    </div>
  )
}

const neonRhombusColor: Record<NeonColor, string> = {
  cyan: 'bg-iff-cyan/40',
  purple: 'bg-[#B8BBFF]/40',
}
export function NeonRhombus({ className, color = 'cyan' }: NeonComponent) {
  return (
    <div className={cn('h-[30px] w-5', dropShadowNeon[color], className)}>
      <div
        className={cn(
          'clip-path-rhombus h-full w-full',
          neonRhombusColor[color]
        )}
      />
    </div>
  )
}

const neonLineColor: Record<NeonColor, string> = {
  cyan: 'bg-iff-cyan/80',
  purple: 'bg-[#9F9DFF]/90',
}
export function NeonLine({ className, color = 'cyan' }: NeonComponent) {
  return (
    <div
      className={cn(
        'h-[340px] w-0.5',
        dropShadowNeon[color],
        neonLineColor[color],
        className
      )}
    />
  )
}

type NeonBorder = NeonComponent & {
  flip?: boolean
}
export function NeonBorder({
  className,
  color = 'cyan',
  flip = false,
}: NeonBorder) {
  return (
    <div className={cn('flex w-14 flex-col', flip && 'rotate-180', className)}>
      <NeonCorner className="mb-[-4px]" color={color} />
      <NeonRhombus className="mb-[-11px]" color={color} />
      <NeonRhombus className="mb-[-11px]" color={color} />
      <NeonRhombus className="mb-[-11px]" color={color} />
      <NeonRhombus className="mb-[7px]" color={color} />
      <NeonLine className="mb-3 ml-[5px] h-[380px]" color={color} />
      <NeonCorner className="rotate-180 -scale-x-100" color={color} />
    </div>
  )
}

type NeonUnderline = NeonComponent
export function NeonUnderline({ className, color = 'cyan' }: NeonUnderline) {
  return (
    <div
      className={cn(
        'flex h-[30px] flex-row flex-nowrap items-center justify-center',
        className
      )}
    >
      <NeonLine className="rotate-90" color={color} />
      <div className="ml-44 flex flex-row flex-nowrap items-center justify-center">
        <NeonRhombus className="rotate-90" color={color} />
        <NeonRhombus className="rotate-90" color={color} />
        <NeonRhombus className="rotate-90" color={color} />
        <NeonRhombus className="rotate-90" color={color} />
      </div>
    </div>
  )
}
