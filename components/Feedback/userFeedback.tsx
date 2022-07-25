import { Avatar } from 'components/Avatar'
import type { BaseComponent } from 'types'
import { classNames } from 'utils'

type UserFeedback = BaseComponent & {
  avatarSrc: string
  username: string
}

export function UserFeedback({
  avatarSrc,
  username,
  className,
  children,
}: React.PropsWithChildren<UserFeedback>) {
  return (
    <div className={classNames('flex flex-row p-4', className)}>
      <Avatar
        size="large"
        color="#BED0FF"
        src={avatarSrc}
        alt="User feedback avatar"
        className="mr-6"
      />
      <div className="flex max-w-full flex-col text-base leading-5 text-white md:max-w-[340px]">
        <p className="m-0 mb-2 font-bold">{children}</p>
        <span className="text-right font-normal italic">- {username}</span>
      </div>
    </div>
  )
}
