import { Components } from './components'
import { Home } from './home'
import { Layouts } from './layouts'
import { Nft } from './nft'
import { Overview } from './overview'

const enUS = {
  ...Components,
  ...Layouts,
  ...Home,
  ...Nft,
  ...Overview,
} as const

export type Locale = Readonly<Record<keyof typeof enUS, string>>

export default enUS
