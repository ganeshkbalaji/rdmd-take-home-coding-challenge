import React from 'react'
import PatientList from './PatientList'
import { mount } from 'enzyme'

import Router from 'components/Router'

test('renders without crashing', () => {
  const wrapper = mount(<PatientList />)
})
