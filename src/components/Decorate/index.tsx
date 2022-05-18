import { BaseComponent } from 'types'
import { classNames } from 'utils'

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
    <div
      className={classNames('w-14 h-[47px]', dropShadowNeon[color], className)}
    >
      <div
        className={classNames(
          'w-full h-full clip-path-corner bg-gradient-to-r from-[#C4C4C4] to-[#C4C4C4] bg-blend-multiply',
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
    <div
      className={classNames('w-5 h-[30px]', dropShadowNeon[color], className)}
    >
      <div
        className={classNames(
          'w-full h-full clip-path-rhombus',
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
      className={classNames(
        'w-0.5 h-[340px]',
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
    <div
      className={classNames(
        'flex flex-col w-14',
        flip && 'rotate-180',
        className
      )}
    >
      <NeonCorner className="mb-[-4px]" color={color} />
      <NeonRhombus className="mb-[-11px]" color={color} />
      <NeonRhombus className="mb-[-11px]" color={color} />
      <NeonRhombus className="mb-[-11px]" color={color} />
      <NeonRhombus className="mb-[6px]" color={color} />
      <NeonLine className="ml-[5px]" color={color} />
      <NeonCorner className="-scale-x-100 rotate-180" color={color} />
    </div>
  )
}
