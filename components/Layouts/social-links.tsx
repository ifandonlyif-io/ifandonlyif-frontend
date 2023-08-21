import type { BaseComponent } from '@/types'
import { cn } from '@/utils'

import { BotIcon, DiscordIcon, TelegramIcon, TwitterXIcon } from '../Icons'
import { ExternalLink } from '../Link'

type SocialLinksProperties = BaseComponent

export function SocialLinks({ className }: SocialLinksProperties) {
  return (
    <div className={cn('flex flex-nowrap gap-5 text-iff-cyan-dark', className)}>
      <ExternalLink title="Discord" to="https://discord.gg/Aet9zHvT">
        <DiscordIcon fontSize={30} />
      </ExternalLink>
      <ExternalLink title="Bot 1" to="https://top.gg/bot/1041015021431431298">
        <BotIcon fontSize={30} />
      </ExternalLink>
      <ExternalLink title="Bot 2" to="https://discordbotlist.com/bots/iff-bot">
        <BotIcon fontSize={30} />
      </ExternalLink>
      <ExternalLink title="Telegram" to="https://t.me/+S-9TD-oQPy5lYWZl">
        <TelegramIcon fontSize={30} />
      </ExternalLink>
      <ExternalLink title="Twitter" to="https://twitter.com/ifandonlyif_io">
        <TwitterXIcon fontSize={30} />
      </ExternalLink>
    </div>
  )
}
