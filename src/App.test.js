import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import CardForm from './components/App/CardForm/cardForm'

test('renders learn react link', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

test('teset', () => {
  const { getByText } = render(<CardForm />)
  const linkElement = getByText(/subscribe/i)
  expect(linkElement).toBeInTheDocument()
})
