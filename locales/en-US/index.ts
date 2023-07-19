import { component, type ComponentsTranslation } from './components'
import { home, type HomeTranslation } from './home'
import { layouts, type LayoutsTranslation } from './layouts'
import { nft, type NftTranslation } from './nft'
import { overview, type OverviewTranslation } from './overview'

export type Locale = Readonly<{
  component: ComponentsTranslation
  layouts: LayoutsTranslation
  home: HomeTranslation
  nft: NftTranslation
  overview: OverviewTranslation
}>

const enUS: Locale = {
  component,
  layouts,
  home,
  nft,
  overview,
} as const

export default enUS
