import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { shallow } from 'enzyme'

import Router from 'components/Router'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('renders a Router', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find(Router).length).toEqual(1)
})
