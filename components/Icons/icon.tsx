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

export function CheckMarkIcon(props: SvgIconProps) {
  return (
    <SvgIcons
      viewBox="0 0 18 18"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <path d="M9 0.75C4.44375 0.75 0.75 4.44375 0.75 9C0.75 13.5562 4.44375 17.25 9 17.25C13.5562 17.25 17.25 13.5562 17.25 9C17.25 4.44375 13.5562 0.75 9 0.75ZM12.576 7.605C12.6418 7.52973 12.692 7.44205 12.7234 7.34713C12.7549 7.2522 12.7671 7.15194 12.7592 7.05224C12.7513 6.95254 12.7236 6.85542 12.6777 6.7666C12.6317 6.67777 12.5685 6.59903 12.4917 6.53501C12.4148 6.47098 12.326 6.42297 12.2303 6.3938C12.1347 6.36462 12.0341 6.35487 11.9347 6.36512C11.8352 6.37537 11.7388 6.40541 11.6511 6.45347C11.5634 6.50154 11.4862 6.56666 11.424 6.645L8.199 10.5142L6.53025 8.84475C6.3888 8.70813 6.19935 8.63254 6.0027 8.63424C5.80605 8.63595 5.61794 8.71483 5.47889 8.85389C5.33983 8.99294 5.26095 9.18105 5.25924 9.3777C5.25754 9.57435 5.33313 9.7638 5.46975 9.90525L7.71975 12.1553C7.79344 12.2289 7.88167 12.2864 7.97881 12.324C8.07595 12.3617 8.17987 12.3787 8.28395 12.374C8.38803 12.3693 8.48998 12.3429 8.58331 12.2966C8.67663 12.2503 8.75929 12.185 8.826 12.105L12.576 7.605Z" />
    </SvgIcons>
  )
}

export function CrossMarkIcon(props: SvgIconProps) {
  return (
    <SvgIcons
      viewBox="0 0 18 18"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <path d="M9 0.75C4.44375 0.75 0.75 4.44375 0.75 9C0.75 13.5562 4.44375 17.25 9 17.25C13.5562 17.25 17.25 13.5562 17.25 9C17.25 4.44375 13.5562 0.75 9 0.75ZM11.7802 7.28025C11.9169 7.1388 11.9925 6.94935 11.9908 6.7527C11.989 6.55605 11.9102 6.36794 11.7711 6.22889C11.6321 6.08983 11.4439 6.01095 11.2473 6.00924C11.0507 6.00754 10.8612 6.08313 10.7198 6.21975L9 7.9395L7.28025 6.21975C7.21106 6.14812 7.12831 6.09098 7.0368 6.05167C6.9453 6.01237 6.84689 5.99168 6.7473 5.99081C6.64772 5.98995 6.54896 6.00892 6.45678 6.04663C6.36461 6.08434 6.28087 6.14003 6.21045 6.21045C6.14003 6.28087 6.08434 6.36461 6.04663 6.45678C6.00892 6.54896 5.98995 6.64772 5.99081 6.7473C5.99168 6.84689 6.01237 6.9453 6.05167 7.0368C6.09098 7.12831 6.14812 7.21106 6.21975 7.28025L7.9395 9L6.21975 10.7198C6.14812 10.7889 6.09098 10.8717 6.05167 10.9632C6.01237 11.0547 5.99168 11.1531 5.99081 11.2527C5.98995 11.3523 6.00892 11.451 6.04663 11.5432C6.08434 11.6354 6.14003 11.7191 6.21045 11.7895C6.28087 11.86 6.36461 11.9157 6.45678 11.9534C6.54896 11.9911 6.64772 12.0101 6.7473 12.0092C6.84689 12.0083 6.9453 11.9876 7.0368 11.9483C7.12831 11.909 7.21106 11.8519 7.28025 11.7802L9 10.0605L10.7198 11.7802C10.8612 11.9169 11.0507 11.9925 11.2473 11.9908C11.4439 11.989 11.6321 11.9102 11.7711 11.7711C11.9102 11.6321 11.989 11.4439 11.9908 11.2473C11.9925 11.0507 11.9169 10.8612 11.7802 10.7198L10.0605 9L11.7802 7.28025Z" />
    </SvgIcons>
  )
}

export function WarnMarkIcon(props: SvgIconProps) {
  return (
    <SvgIcons viewBox="0 0 20 18" {...props}>
      <path d="M8.6279 0.353094C9.98767 -0.40098 11.7174 0.0944694 12.4773 1.44209L19.746 14.0572C19.906 14.4338 19.976 14.7399 19.996 15.058C20.036 15.8012 19.776 16.5236 19.2661 17.0795C18.7562 17.6334 18.0663 17.9604 17.3164 18H2.6789C2.36896 17.9812 2.05901 17.9108 1.76906 17.8018C0.319301 17.2172 -0.380581 15.5723 0.20932 14.1464L7.52809 1.43317C7.77804 0.986278 8.15798 0.600818 8.6279 0.353094ZM9.99767 12.2726C9.51775 12.2726 9.11782 12.669 9.11782 13.1456C9.11782 13.6202 9.51775 14.0176 9.99767 14.0176C10.4776 14.0176 10.8675 13.6202 10.8675 13.1347C10.8675 12.66 10.4776 12.2726 9.99767 12.2726ZM9.99767 6.09039C9.51775 6.09039 9.11782 6.47585 9.11782 6.95248V9.75573C9.11782 10.2314 9.51775 10.6287 9.99767 10.6287C10.4776 10.6287 10.8675 10.2314 10.8675 9.75573V6.95248C10.8675 6.47585 10.4776 6.09039 9.99767 6.09039Z" />
    </SvgIcons>
  )
}

export function EmailIcon(props: SvgIconProps) {
  return (
    <SvgIcons viewBox="0 0 17 14" {...props}>
      <path d="M14.4259 0.333496H2.75928C2.09624 0.333496 1.46035 0.596888 0.991511 1.06573C0.52267 1.53457 0.259277 2.17045 0.259277 2.8335V11.1668C0.259277 11.8299 0.52267 12.4658 0.991511 12.9346C1.46035 13.4034 2.09624 13.6668 2.75928 13.6668H14.4259C15.089 13.6668 15.7249 13.4034 16.1937 12.9346C16.6626 12.4658 16.9259 11.8299 16.9259 11.1668V2.8335C16.9259 2.17045 16.6626 1.53457 16.1937 1.06573C15.7249 0.596888 15.089 0.333496 14.4259 0.333496ZM13.8676 2.00016L8.59261 5.95849L3.31761 2.00016H13.8676ZM14.4259 12.0002H2.75928C2.53826 12.0002 2.3263 11.9124 2.17002 11.7561C2.01374 11.5998 1.92594 11.3878 1.92594 11.1668V3.04183L8.09261 7.66683C8.23686 7.77501 8.4123 7.83349 8.59261 7.83349C8.77292 7.83349 8.94836 7.77501 9.09261 7.66683L15.2593 3.04183V11.1668C15.2593 11.3878 15.1715 11.5998 15.0152 11.7561C14.8589 11.9124 14.647 12.0002 14.4259 12.0002Z" />
    </SvgIcons>
  )
}

export function TwitterIcon(props: SvgIconProps) {
  return (
    <SvgIcons viewBox="0 0 20 16" {...props}>
      <path d="M19.2952 2.11416C18.5994 2.4225 17.8519 2.63083 17.066 2.725C17.8769 2.23983 18.4835 1.47622 18.7727 0.576665C18.0109 1.02916 17.1772 1.34766 16.3077 1.51833C15.723 0.894052 14.9486 0.48027 14.1046 0.341226C13.2607 0.202183 12.3944 0.345658 11.6404 0.749375C10.8863 1.15309 10.2867 1.79447 9.9345 2.57392C9.58231 3.35337 9.49731 4.22729 9.6927 5.06C8.14911 4.98249 6.63906 4.58129 5.26056 3.88242C3.88205 3.18355 2.6659 2.20263 1.69104 1.00333C1.3577 1.57833 1.16604 2.245 1.16604 2.955C1.16566 3.59416 1.32306 4.22353 1.62427 4.78727C1.92547 5.35102 2.36117 5.8317 2.8927 6.18666C2.27627 6.16705 1.67343 6.00048 1.13437 5.70083V5.75083C1.13431 6.64728 1.4444 7.51615 2.01202 8.20999C2.57965 8.90384 3.36984 9.37994 4.24854 9.5575C3.67669 9.71226 3.07715 9.73506 2.4952 9.62416C2.74312 10.3955 3.22603 11.07 3.87634 11.5533C4.52665 12.0365 5.3118 12.3043 6.12187 12.3192C4.74673 13.3987 3.04844 13.9842 1.3002 13.9817C0.990519 13.9817 0.681099 13.9637 0.373535 13.9275C2.1481 15.0685 4.21382 15.674 6.32353 15.6717C13.4652 15.6717 17.3694 9.75666 17.3694 4.62666C17.3694 4.46 17.3652 4.29166 17.3577 4.125C18.1171 3.57581 18.7726 2.89574 19.2935 2.11666L19.2952 2.11416Z" />
    </SvgIcons>
  )
}

export function MetamaskIcon(props: SvgIconProps) {
  return (
    <SvgIcons viewBox="0 0 397 355" fill="none" {...props}>
      <g fill="#cdbdb2">
        <path d="M113.62 326.2l52.005 13.81v-18.059l4.245-4.249h29.717v36.119h-31.84l-39.269-16.997z" />
        <path d="M283.43 326.2l-50.943 13.81v-18.059l-4.245-4.249h-29.717v36.119h31.84l39.269-16.997z" />
      </g>
      <path
        d="M169.87 286.89l-4.245 35.057 5.307-4.249h55.189l6.368 4.249-4.245-35.057-8.491-5.312-42.453 1.062z"
        fill="#393939"
      />
      <path
        d="M141.22 49.992l25.472 59.49 11.675 173.16h41.392l12.736-173.16 23.349-59.49z"
        fill="#f89c35"
      />
      <path
        d="M29.778 180.66L.061 266.708l74.292-4.249h47.759v-37.181l-2.123-76.487-10.613 8.499z"
        fill="#f89d35"
      />
      <path
        d="M86.028 190.22l87.028 2.125-9.552 44.618-41.392-10.623z"
        fill="#d87c30"
      />
      <path d="M86.028 191.28l36.085 33.994v33.994z" fill="#ea8d3a" />
      <path
        d="M122.11 226.34l42.453 10.623 13.797 45.68-9.552 5.312-46.698-27.62z"
        fill="#f89d35"
      />
      <path d="M122.11 260.33l-8.491 65.864 56.25-39.306z" fill="#eb8f35" />
      <path d="M173.06 192.34l5.307 90.297-15.92-46.211z" fill="#ea8e3a" />
      <path d="M73.292 261.39l48.821-1.062-8.491 65.864z" fill="#d87c30" />
      <path
        d="M23.41 354.88l90.212-28.683-40.33-64.802-73.231 5.312z"
        fill="#eb8f35"
      />
      <path
        d="M166.69 109.48l-45.637 38.244-35.024 42.493 87.028 3.187z"
        fill="#e8821e"
      />
      <path
        d="M113.62 326.2l56.25-39.306-4.245 33.994v19.122l-38.208-7.436zm169.81 0l-55.189-39.306 4.245 33.994v19.122l38.208-7.436z"
        fill="#dfcec3"
      />
      <path d="M149.7 211.46l11.675 24.433-41.392-10.623z" fill="#393939" />
      <path d="M22.349.062l144.34 109.42-24.41-59.49z" fill="#e88f35" />
      <path
        d="M22.349.062L3.245 58.49l10.613 63.739-7.429 4.249 10.613 9.561-8.491 7.436 11.675 10.623-7.429 6.374 16.981 21.246 79.599-24.433c38.915-31.161 58.019-47.096 57.311-47.805S117.867 72.3 22.348.061z"
        fill="#8e5a30"
      />
      <g transform="matrix(-1 0 0 1 398.06 -1)">
        <path
          d="M30.778 181.66L1.061 267.708l74.292-4.249h47.759v-37.181l-2.123-76.487-10.613 8.499z"
          fill="#f89d35"
        />
        <path
          d="M87.028 191.22l87.028 2.125-9.552 44.618-41.392-10.623z"
          fill="#d87c30"
        />
        <path d="m87.028 192.28 36.085 33.994v33.994z" fill="#ea8d3a" />
        <path
          d="M123.11 227.34l42.453 10.623 13.797 45.68-9.552 5.312-46.698-27.62z"
          fill="#f89d35"
        />
        <path d="m123.11 261.33-8.4906 65.864 55.189-38.244z" fill="#eb8f35" />
        <path d="M174.06 193.34l5.307 90.297-15.92-46.211z" fill="#ea8e3a" />
        <path d="M74.292 262.39l48.821-1.062-8.491 65.864z" fill="#d87c30" />
        <path
          d="M24.41 355.88l90.212-28.683-40.33-64.802-73.231 5.312z"
          fill="#eb8f35"
        />
        <path
          d="m167.69 110.48-45.637 38.244-35.024 42.493 87.028 3.187z"
          fill="#e8821e"
        />
        <path d="M150.7 212.46l11.675 24.433-41.392-10.623z" fill="#393939" />
        <path d="M23.349 1.062l144.34 109.42-24.41-59.49z" fill="#e88f35" />
        <path
          d="M23.349 1.062L4.245 59.49l10.613 63.739-7.429 4.249 10.613 9.561-8.491 7.436 11.675 10.623-7.429 6.374 16.981 21.246 79.599-24.433c38.915-31.161 58.019-47.096 57.311-47.805S118.867 73.3 23.348 1.061z"
          fill="#8e5a30"
        />
      </g>
    </SvgIcons>
  )
}

export function EthereumIcon(props: SvgIconProps) {
  return (
    <SvgIcons viewBox="0 0 1920 1920" fill="none" {...props}>
      <g>
        <polygon fill="#8A92B2" points="959.8,80.7 420.1,976.3 959.8,731" />
        <polygon fill="#62688F" points="959.8,731 420.1,976.3 959.8,1295.4" />
        <polygon fill="#62688F" points="1499.6,976.3 959.8,80.7 959.8,731" />
        <polygon fill="#454A75" points="959.8,1295.4 1499.6,976.3 959.8,731" />
        <polygon
          fill="#8A92B2"
          points="420.1,1078.7 959.8,1839.3 959.8,1397.6"
        />
        <polygon
          fill="#62688F"
          points="959.8,1397.6 959.8,1839.3 1499.9,1078.7"
        />
      </g>
    </SvgIcons>
  )
}

export function MoreVerticalIcon(props: SvgIconProps) {
  return (
    <SvgIcons viewBox="0 0 21 20" strokeWidth="2" {...props}>
      <path d="M9.75912 3.33333C9.75912 3.79357 10.1322 4.16667 10.5924 4.16667C11.0527 4.16667 11.4258 3.79357 11.4258 3.33333C11.4258 2.8731 11.0527 2.5 10.5924 2.5C10.1322 2.5 9.75912 2.8731 9.75912 3.33333Z" />
      <path d="M9.75912 9.99984C9.75912 10.4601 10.1322 10.8332 10.5924 10.8332C11.0527 10.8332 11.4258 10.4601 11.4258 9.99984C11.4258 9.5396 11.0527 9.1665 10.5924 9.1665C10.1322 9.1665 9.75912 9.5396 9.75912 9.99984Z" />
      <path d="M9.75912 16.6668C9.75912 17.1271 10.1322 17.5002 10.5924 17.5002C11.0527 17.5002 11.4258 17.1271 11.4258 16.6668C11.4258 16.2066 11.0527 15.8335 10.5924 15.8335C10.1322 15.8335 9.75912 16.2066 9.75912 16.6668Z" />
    </SvgIcons>
  )
}
