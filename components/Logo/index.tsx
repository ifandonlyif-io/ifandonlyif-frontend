import type { SvgIconProperties } from '@/components/Icons'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

export function IFFLogo(properties: BaseComponent & SvgIconProperties) {
  return (
    <svg
      width="106"
      height="62"
      viewBox="0 0 106 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...properties}
    >
      <rect width="106" height="62" fill="black" />
      <path
        d="M16.6309 11.4688V20H14.8789V11.4688H16.6309ZM20.0352 11.4688V20H18.2773V11.4688H20.0352ZM23.4336 15.1133V16.4844H19.5547V15.1133H23.4336ZM23.8438 11.4688V12.8457H19.5547V11.4688H23.8438ZM18.2305 23.9277L15.9102 31H14.041L17.2109 22.4688H18.4004L18.2305 23.9277ZM20.1582 31L17.832 23.9277L17.6445 22.4688H18.8457L22.0332 31H20.1582ZM20.0527 27.8242V29.2012H15.5469V27.8242H20.0527ZM29.7676 22.4688V31H28.0098L24.582 25.2812V31H22.8242V22.4688H24.582L28.0156 28.1934V22.4688H29.7676ZM33.916 31H32.0586L32.0703 29.6289H33.916C34.377 29.6289 34.7656 29.5254 35.082 29.3184C35.3984 29.1074 35.6367 28.8008 35.7969 28.3984C35.9609 27.9961 36.043 27.5098 36.043 26.9395V26.5234C36.043 26.0859 35.9961 25.7012 35.9023 25.3691C35.8125 25.0371 35.6777 24.7578 35.498 24.5312C35.3184 24.3047 35.0977 24.1348 34.8359 24.0215C34.5742 23.9043 34.2734 23.8457 33.9336 23.8457H32.0234V22.4688H33.9336C34.5039 22.4688 35.0254 22.5664 35.498 22.7617C35.9746 22.9531 36.3867 23.2285 36.7344 23.5879C37.082 23.9473 37.3496 24.377 37.5371 24.877C37.7285 25.373 37.8242 25.9258 37.8242 26.5352V26.9395C37.8242 27.5449 37.7285 28.0977 37.5371 28.5977C37.3496 29.0977 37.082 29.5273 36.7344 29.8867C36.3906 30.2422 35.9785 30.5176 35.498 30.7129C35.0215 30.9043 34.4941 31 33.916 31ZM33.0547 22.4688V31H31.2969V22.4688H33.0547ZM21.7695 37.5352V37.9395C21.7695 38.5879 21.6816 39.1699 21.5059 39.6855C21.3301 40.2012 21.082 40.6406 20.7617 41.0039C20.4414 41.3633 20.0586 41.6387 19.6133 41.8301C19.1719 42.0215 18.6816 42.1172 18.1426 42.1172C17.6074 42.1172 17.1172 42.0215 16.6719 41.8301C16.2305 41.6387 15.8477 41.3633 15.5234 41.0039C15.1992 40.6406 14.9473 40.2012 14.7676 39.6855C14.5918 39.1699 14.5039 38.5879 14.5039 37.9395V37.5352C14.5039 36.8828 14.5918 36.3008 14.7676 35.7891C14.9434 35.2734 15.1914 34.834 15.5117 34.4707C15.8359 34.1074 16.2188 33.8301 16.6602 33.6387C17.1055 33.4473 17.5957 33.3516 18.1309 33.3516C18.6699 33.3516 19.1602 33.4473 19.6016 33.6387C20.0469 33.8301 20.4297 34.1074 20.75 34.4707C21.0742 34.834 21.3242 35.2734 21.5 35.7891C21.6797 36.3008 21.7695 36.8828 21.7695 37.5352ZM19.9941 37.9395V37.5234C19.9941 37.0703 19.9531 36.6719 19.8711 36.3281C19.7891 35.9844 19.668 35.6953 19.5078 35.4609C19.3477 35.2266 19.1523 35.0508 18.9219 34.9336C18.6914 34.8125 18.4277 34.752 18.1309 34.752C17.834 34.752 17.5703 34.8125 17.3398 34.9336C17.1133 35.0508 16.9199 35.2266 16.7598 35.4609C16.6035 35.6953 16.4844 35.9844 16.4023 36.3281C16.3203 36.6719 16.2793 37.0703 16.2793 37.5234V37.9395C16.2793 38.3887 16.3203 38.7871 16.4023 39.1348C16.4844 39.4785 16.6055 39.7695 16.7656 40.0078C16.9258 40.2422 17.1211 40.4199 17.3516 40.541C17.582 40.6621 17.8457 40.7227 18.1426 40.7227C18.4395 40.7227 18.7031 40.6621 18.9336 40.541C19.1641 40.4199 19.3574 40.2422 19.5137 40.0078C19.6699 39.7695 19.7891 39.4785 19.8711 39.1348C19.9531 38.7871 19.9941 38.3887 19.9941 37.9395ZM29.9785 33.4688V42H28.2207L24.793 36.2812V42H23.0352V33.4688H24.793L28.2266 39.1934V33.4688H29.9785ZM36.9922 40.6289V42H32.6973V40.6289H36.9922ZM33.2656 33.4688V42H31.5078V33.4688H33.2656ZM37.6016 33.4688L39.3828 37.3594L41.1641 33.4688H43.0801L40.2734 38.8945V42H38.4922V38.8945L35.6797 33.4688H37.6016ZM16.6309 44.4688V53H14.8789V44.4688H16.6309ZM20.0352 44.4688V53H18.2773V44.4688H20.0352ZM23.4336 48.1133V49.4844H19.5547V48.1133H23.4336ZM23.8438 44.4688V45.8457H19.5547V44.4688H23.8438Z"
        fill="#46FFE6"
      />
    </svg>
  )
}

export function IFFCube(properties: BaseComponent) {
  const { className } = properties
  return (
    <div
      className={cn(
        'iff-cube',
        'text-shadow-iff-cube relative mt-[var(--iff-cube-size)] h-full w-full text-justify text-5xl font-bold text-iff-cyan',
        '[perspective:calc(var(--iff-cube-size)*2)]',
        className
      )}
    >
      <div
        className={cn(
          'iff-cube-container',
          'absolute inset-0 m-auto h-[var(--iff-cube-size)] w-[var(--iff-cube-size)] animate-datspintho',
          '[transform-style:preserve-3d] [transform:rotateY(45deg)_rotateX(0)]'
        )}
      >
        {/** IFF cube face top */}
        <div
          className={cn(
            'iff-cube-face iff-cube-face-top',
            'h-full [transform:rotateX(90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          IF
        </div>
        <div
          className={cn(
            'iff-cube-face iff-cube-face-top-left',
            '[transform:translateY(calc(var(--iff-cube-size)/-3))_rotateY(-85deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          IF
        </div>
        <div
          className={cn(
            'iff-cube-face iff-cube-face-top-front',
            '[transform:rotateY(5deg)_translateY(calc(var(--iff-cube-size)/-3))_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          AND&nbsp;
        </div>
        <div
          className={cn(
            'iff-cube-face iff-cube-face-top-right',
            'text-right [transform:translateY(calc(var(--iff-cube-size)/-3))_rotateY(90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          ONLY
        </div>
        <div
          className={cn(
            'iff-cube-face iff-cube-face-top-bottom',
            '[transform:translateY(calc(var(--iff-cube-size)/-3))_translateZ(calc(var(--iff-cube-size)/-2))_rotateY(180deg)]'
          )}
        >
          IF
        </div>
        {/** IFF cube face middle */}
        <div
          className={cn(
            'iff-cube-face iff-cube-face-middle-left',
            '[transform:rotateY(-90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          AND&nbsp;
        </div>
        <div
          className={cn(
            'iff-cube-face iff-cube-face-middle-front',
            '[transform:rotateY(0deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          &nbsp;ONLY
        </div>
        <div
          className={cn(
            'iff-cube-face iff-cube-face-middle-right',
            '[transform:rotateY(90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          AND
        </div>
        <div
          className={cn(
            'iff-cube-face iff-cube-face-middle-bottom',
            '[transform:translateZ(calc(var(--iff-cube-size)/-2))_rotateY(190deg)]'
          )}
        >
          IF
        </div>
        {/** IFF cube face bottom */}
        <div
          className={cn(
            'iff-cube-face iff-cube-face-bottom-left',
            'text-left [transform:rotateY(-10deg)_translateY(calc(var(--iff-cube-size)/3))_rotateY(-90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          ONLY
        </div>
        <div
          className={cn(
            'iff-cube-face iff-cube-face-bottom-front',
            '[transform:rotateY(-10deg)_translateY(calc(var(--iff-cube-size)/3))_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          IF
        </div>
        <div
          className={cn(
            'iff-cube-face iff-cube-face-bottom-right',
            '[transform:rotateY(-10deg)_translateY(calc(var(--iff-cube-size)/3))_rotateY(90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          IF
        </div>
        <div
          className={cn(
            'iff-cube-face iff-cube-face-bottom-bottom',
            '[transform:rotateY(-10deg)_translateY(calc(var(--iff-cube-size)/3))_translateZ(calc(var(--iff-cube-size)/-2))_rotateY(180deg)]'
          )}
        >
          AND
        </div>
        <div
          className={cn(
            'iff-cube-face iff-cube-face-bottom',
            'h-full [transform:rotateY(-10deg)_rotateX(-90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          AND&nbsp;
          <br />
          ONLY IF
        </div>
      </div>
    </div>
  )
}
