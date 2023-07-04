import type { StaticImageData } from 'next/image'

import { Avatar } from '@/components/Avatar'
import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

type UserFeedback = BaseComponent & {
  avatarSrc: string | StaticImageData
  username?: string
}

export function UserFeedback({
  avatarSrc,
  username,
  className,
  children,
}: React.PropsWithChildren<UserFeedback>) {
  return (
    <div
      className={cn('flex flex-col p-4 md:flex-row md:flex-nowrap', className)}
    >
      <Avatar
        size="large"
        color="#BED0FF"
        src={avatarSrc}
        alt="User feedback avatar"
        className="mb-4 md:mb-0 md:mr-6"
      />
      <div className="flex max-w-full flex-col text-base leading-5 text-white xl:max-w-[340px]">
        <p className="m-0 mb-2 font-bold">{children}</p>
        {username && (
          <span className="text-right font-normal italic">- {username}</span>
        )}
      </div>
    </div>
  )
}
