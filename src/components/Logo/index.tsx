import { classNames } from 'utils'

export function IFFLogo() {
  return (
    <div className="flex items-center pl-3.5 w-[106px] h-[62px] bg-black">
      <div className="w-[30px] font-['Roboto'] text-xs font-bold leading-[11px] text-iff-cyan">
        IF AND ONLY IF
      </div>
    </div>
  )
}

export function IFFCube() {
  return (
    <div
      className={classNames(
        'iff-cube',
        'relative text-5xl text-justify text-shadow-iff-cube text-iff-cyan font-bold w-full h-full mt-[var(--iff-cube-size)]',
        '[perspective:calc(var(--iff-cube-size)*2)]'
      )}
    >
      <div
        className={classNames(
          'iff-cube-container',
          'absolute inset-0 m-auto h-[var(--iff-cube-size)] w-[var(--iff-cube-size)] animate-datspintho',
          '[transform:rotateY(45deg)_rotateX(0)] [transform-style:preserve-3d]'
        )}
      >
        {/** IFF cube face top */}
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-top',
            'h-full [transform:rotateX(90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          IF
        </div>
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-top-left',
            '[transform:translateY(calc(var(--iff-cube-size)/-3))_rotateY(-85deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          IF
        </div>
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-top-front',
            '[transform:rotateY(5deg)_translateY(calc(var(--iff-cube-size)/-3))_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          AND&nbsp;
        </div>
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-top-right',
            'text-right [transform:translateY(calc(var(--iff-cube-size)/-3))_rotateY(90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          ONLY
        </div>
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-top-bottom',
            '[transform:translateY(calc(var(--iff-cube-size)/-3))_translateZ(calc(var(--iff-cube-size)/-2))_rotateY(180deg)]'
          )}
        >
          IF
        </div>
        {/** IFF cube face middle */}
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-middle-left',
            '[transform:rotateY(-90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          AND&nbsp;
        </div>
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-middle-front',
            '[transform:rotateY(0deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          &nbsp;ONLY
        </div>
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-middle-right',
            '[transform:rotateY(90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          AND
        </div>
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-middle-bottom',
            '[transform:translateZ(calc(var(--iff-cube-size)/-2))_rotateY(190deg)]'
          )}
        >
          IF
        </div>
        {/** IFF cube face bottom */}
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-bottom-left',
            'text-left [transform:rotateY(-10deg)_translateY(calc(var(--iff-cube-size)/3))_rotateY(-90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          ONLY
        </div>
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-bottom-front',
            '[transform:rotateY(-10deg)_translateY(calc(var(--iff-cube-size)/3))_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          IF
        </div>
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-bottom-right',
            '[transform:rotateY(-10deg)_translateY(calc(var(--iff-cube-size)/3))_rotateY(90deg)_translateZ(calc(var(--iff-cube-size)/2))]'
          )}
        >
          IF
        </div>
        <div
          className={classNames(
            'iff-cube-face iff-cube-face-bottom-bottom',
            '[transform:rotateY(-10deg)_translateY(calc(var(--iff-cube-size)/3))_translateZ(calc(var(--iff-cube-size)/-2))_rotateY(180deg)]'
          )}
        >
          AND
        </div>
        <div
          className={classNames(
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
