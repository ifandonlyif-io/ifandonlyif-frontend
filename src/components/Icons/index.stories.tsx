import { ComponentMeta } from '@storybook/react'

import {
  CheckMarkIcon,
  CrossMarkIcon,
  EmailIcon,
  EthereumIcon,
  MetamaskIcon,
  SvgIcons,
  TwitterIcon,
  WarnMarkIcon,
} from './index'

export default {
  title: 'Components/Icons',
  component: SvgIcons,
} as ComponentMeta<typeof SvgIcons>

export const Showcase = () => (
  <div className="flex flex-row gap-2 items-center p-4 bg-white">
    <CheckMarkIcon htmlColor="#5A0DFF" />
    <CrossMarkIcon htmlColor="#FF0000" />
    <WarnMarkIcon htmlColor="#FF7269" />
    <EmailIcon htmlColor="#4F4F4F" />
    <TwitterIcon htmlColor="#4F4F4F" />
    <MetamaskIcon />
    <EthereumIcon />
  </div>
)
