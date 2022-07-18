import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Footer } from './footer'
import { DefaultLayout, OverviewLayout } from './layout'
import { Navbar } from './navbar'

export default {
  title: 'Components/Layouts',
  component: Navbar,
} as ComponentMeta<typeof Navbar>

export const NavbarComponent: ComponentStory<typeof Navbar> = () => (
  <div className="bg-sky-700 p-4">
    <Navbar />
  </div>
)

export const FooterComponent: ComponentStory<typeof Footer> = () => (
  <div className="bg-sky-700 p-4">
    <Footer />
  </div>
)

export const Default: ComponentStory<typeof DefaultLayout> = () => (
  <div className="bg-sky-700 p-4">
    <DefaultLayout>
      <div className="flex items-center justify-center py-20 text-white">
        Content
      </div>
    </DefaultLayout>
  </div>
)

export const Overview: ComponentStory<typeof OverviewLayout> = () => (
  <div className="bg-sky-700 p-4">
    <OverviewLayout>
      <div className="flex items-center justify-center py-20 text-white">
        Content
      </div>
    </OverviewLayout>
  </div>
)
