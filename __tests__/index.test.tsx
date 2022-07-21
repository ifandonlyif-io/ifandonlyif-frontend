import { render, screen } from '@testing-library/react'
import Index from 'pages/index'

describe('<Index />', () => {
  it('should render the Index', () => {
    const { container } = render(<Index feedbacks={[]} />)

    expect(
      screen.getByRole('heading', {
        name: /welcome to/i,
        level: 2,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(/reactjs-vite-tailwindcss-boilerplate/i)
    ).toBeInTheDocument()

    expect(screen.getByText(/start building for free./i)).toBeInTheDocument()

    expect(screen.getByRole('img')).toBeInTheDocument()

    expect(container.firstChild).toBeInTheDocument()
  })
})
