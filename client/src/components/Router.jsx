import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import PatientList from './PatientList'
import Home from './Home'
import Results from './Results'

// navigates the user through different pages in the application
function Layout({ title, children }) {
  return (
    <div className='container'>
      <div className='row justify-content-md-center text-left'>
        <div className='col-10'>
          <h1 className='my-3'>{title}</h1>
          {children}
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default function Router() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul className='nav justify-content-center'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/patients'>
                Patients
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/results'>
                Results
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path='/patients'>
            <Layout title='Patients'>
              <PatientList />
            </Layout>
          </Route>
          <Route path='/results'>
            <Layout title='Results'>
              <Results />
            </Layout>
          </Route>
          
          <Route path='/'>
            <Layout title='Patient Manager'>
              <Home />
            </Layout>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}
