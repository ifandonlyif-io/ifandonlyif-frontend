import type { Meta, StoryObj } from '@storybook/react'

import { Footer } from './footer'
import { DefaultLayout, OverviewLayout } from './layout'
import { Navbar } from './navbar'

const meta: Meta<typeof Navbar> = {
  title: 'Components/Layouts',
  component: Navbar,
  tags: ['autodocs'],
}

export default meta

type NavbarStory = StoryObj<typeof Navbar>

export const NavbarComponent: NavbarStory = {
  render: (arguments_) => (
    <div className="bg-sky-700 p-4">
      <Navbar {...arguments_} />
    </div>
  ),
}

type FooterStory = StoryObj<typeof Footer>

export const FooterComponent: FooterStory = {
  render: (arguments_) => (
    <div className="bg-sky-700 p-4">
      <Footer {...arguments_} />
    </div>
  ),
}

type DefaultLayoutStory = StoryObj<typeof DefaultLayout>

export const Default: DefaultLayoutStory = {
  render: () => (
    <div className="bg-sky-700 p-4">
      <DefaultLayout>
        <div className="flex items-center justify-center py-20 text-white">
          Content
        </div>
      </DefaultLayout>
    </div>
  ),
}

type OverviewLayoutStory = StoryObj<typeof OverviewLayout>

export const Overview: OverviewLayoutStory = {
  render: () => (
    <div className="bg-sky-700 p-4">
      <OverviewLayout>
        <div className="flex items-center justify-center py-20 text-white">
          Content
        </div>
      </OverviewLayout>
    </div>
  ),
}
