import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Footer } from './footer'
import { DefaultLayout, OverviewLayout } from './layout'
import { Navbar } from './navbar'

export default {
  title: 'Components/Layouts',
  component: Navbar,
} as ComponentMeta<typeof Navbar>

export const NavbarComponent: ComponentStory<typeof Navbar> = () => (
  <div className="p-4 bg-sky-700">
    <Navbar />
  </div>
)

export const FooterComponent: ComponentStory<typeof Footer> = () => (
  <div className="p-4 bg-sky-700">
    <Footer />
  </div>
)

export const Default: ComponentStory<typeof DefaultLayout> = () => (
  <div className="p-4 bg-sky-700">
    <DefaultLayout>
      <div className="flex justify-center items-center py-20 text-white">
        Content
      </div>
    </DefaultLayout>
  </div>
)

export const Overview: ComponentStory<typeof OverviewLayout> = () => (
  <div className="p-4 bg-sky-700">
    <OverviewLayout>
      <div className="flex justify-center items-center py-20 text-white">
        Content
      </div>
    </OverviewLayout>
  </div>
)
