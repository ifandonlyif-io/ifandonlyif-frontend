import Components from './components'
import Home from './home'
import Layouts from './layouts'

export default {
  ...Components,
  ...Layouts,
  ...Home,
} as const
