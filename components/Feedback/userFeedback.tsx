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
    <div className={classNames('flex flex-row', className)}>
      <Avatar
        size="large"
        color="#BED0FF"
        src={avatarSrc}
        alt="User feedback avatar"
        className="mr-6"
      />
      <div className="flex flex-col max-w-full text-base leading-5 text-white md:max-w-[340px]">
        <p className="m-0 mb-2 font-bold">{children}</p>
        <span className="italic font-normal text-right">- {username}</span>
      </div>
    </div>
  )
}
