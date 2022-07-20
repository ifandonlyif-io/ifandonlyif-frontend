import { ComponentMeta } from '@storybook/react'

import {
  CheckMarkIcon,
  CrossMarkIcon,
  EmailIcon,
  EthereumIcon,
  ExternalLinkIcon,
  MetamaskIcon,
  MoreVerticalIcon,
  Rotate360Icon,
  TwitterIcon,
  WalletConnectIcon,
  WarnMarkIcon,
} from './icon'
import { SvgIcons } from './svgIcon'

export default {
  title: 'Components/Icons',
  component: SvgIcons,
} as ComponentMeta<typeof SvgIcons>

export const Showcase = () => (
  <div className="flex flex-row items-center gap-2 bg-white p-4">
    <CheckMarkIcon htmlColor="#5A0DFF" />
    <CrossMarkIcon htmlColor="#FF0000" />
    <WarnMarkIcon htmlColor="#FF7269" />
    <EmailIcon htmlColor="#4F4F4F" />
    <TwitterIcon htmlColor="#4F4F4F" />
    <MetamaskIcon />
    <WalletConnectIcon />
    <EthereumIcon />
    <MoreVerticalIcon stroke="#4F4F4F" />
    <ExternalLinkIcon htmlColor="#4F4F4F" />
    <Rotate360Icon htmlColor="#4F4F4F" />
  </div>
)
