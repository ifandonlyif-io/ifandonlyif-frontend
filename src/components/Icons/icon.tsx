import { SvgIconProps, SvgIcons } from './svgIcon'

export function SelectMenuArrowIcon(props: SvgIconProps) {
  return (
    <SvgIcons viewBox="0 0 16 11" {...props}>
      <path d="M8.74193 10.353C8.34159 10.855 7.57866 10.855 7.17832 10.353L0.481945 1.95678C-0.040451 1.30177 0.425938 0.333252 1.26375 0.333252H14.6565C15.4943 0.333252 15.9607 1.30177 15.4383 1.95678L8.74193 10.353Z" />
    </SvgIcons>
  )
}

export function CheckIcon(props: SvgIconProps) {
  return (
    <SvgIcons viewBox="0 0 14 14" {...props}>
      <path
        d="M2 6.7619L5.35618 11.3966C5.56465 11.6845 5.99851 11.6691 6.18597 11.3671L12 2"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </SvgIcons>
  )
}