import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DashboardPage from '@/app/dashboard/page'
 
describe('DashboardPage', () => {
  it('renders a heading', () => {
    render(<DashboardPage />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Job Feed')
  })
})