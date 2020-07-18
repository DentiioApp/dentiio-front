import React from 'react'
import { render } from '@testing-library/react'
import Index from './index.js'

test('renders learn react link', () => {
  const { getByText } = render(<Index />)
  const linkElement = getByText(/Dentiio/i)
  expect(linkElement).toBeInTheDocument()
})
