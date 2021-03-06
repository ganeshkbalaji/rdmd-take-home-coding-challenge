import React, { Component, Fragment } from 'react'

import Api from './Api'
import PatientItem  from './PatientItem'

import { withError } from "../util/commonUtil"

// Displays a list of patients in the patient manager app
export default class PatientList extends Component {
  state = {
    patients: undefined,
    error: undefined,
    name: undefined,
    aliasName: undefined,
    birthday: undefined,
    diagnosis: undefined,
    email: undefined,
  }

  constructor(props) {
    super(props)

    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  async componentDidMount() {
    withError(async () => {
      const patients = await Api.patientList()
      this.setState({ patients })
    })
  }

  async handleEdit(patient) {
    withError(async () => {
      await Api.patientPatch(patient.id, patient.aliasName)
      this.setState({ patients: this.state.patients })
    })
  }

  async handleDelete(patient) {
    withError(async () => {
      await Api.patientDelete(patient.id)
      const patients = this.state.patients.filter(p => p.id !== patient.id)
      this.setState({ patients })
    })
  }

  // adds a new patient to the list
  async handleAdd(e) {
    const { name, aliasName, birthday, diagnosis, email } = this.state
    
    withError(async () => {
      if (!name) throw new TypeError('Please provide a name')
      if (!diagnosis) throw new TypeError('Please provide a ndiangissame')
      const patient = await Api.patientAdd({ name, aliasName, birthday, diagnosis, email, aliasName })
      const patients = this.state.patients.concat(patient)
      this.setState({ patients, name: undefined, aliasName: undefined, birthday: undefined, diagnosis: undefined, email: undefined })
    })
    e.preventDefault()
  }

  updateState(key, e) {
    this.setState({ [key]: e.target.value })
  }

  render() {
    const { patients, error, name, aliasName, birthday, diagnosis, email } = this.state
    return (
      <Fragment>
        {error && <div className='alert alert-danger'>{error.message}</div>}
        {patients && (
          <ul className='list-group'>
            <li className='list-group-item'>
              <form className='row'>
                <div className='col-auto'>
                  <input
                    className='form-control'
                    onChange={e => this.updateState('name', e)}
                    placeholder='Patient Name'
                    value={name || ''}
                  />
                  <input
                    className='form-control'
                    onChange={e => this.updateState('aliasName', e)}
                    placeholder='Patient Alias Name'
                    value={aliasName || ''}
                  />
                  <input
                    className='form-control'
                    onChange={e => this.updateState('birthday', e)}
                    placeholder='Patient Birthday'
                    type='date'
                    value={birthday || ''}
                  />
                  <select
                    className='form-control'
                    value={diagnosis}
                    onChange={e => this.updateState('diagnosis', e)}
                  >
                    <option value="">Select a diagnosis</option>
                    <option value="cdkl5">CDKL5</option>
                    <option value="hunter">Hunter syndrome</option>
                    <option value="nf2">NF2</option>
                    <option value="wilson">Wilson disease</option>
                  </select>
                  <input
                    className='form-control'
                    onChange={e => this.updateState('email', e)}
                    placeholder='Patient Email Address'
                    type='email'
                    value={email || ''}
                  />
                   <button
                    className='btn btn-primary'
                    disabled={!name}
                    onClick={this.handleAdd}
                    type='submit'
                  >
                    Add
                  </button>
                </div>
              </form>
            </li>
            {patients.map(patient => (
              <li key={patient.id} className='list-group-item'>
                <PatientItem
                  patient={patient}
                  onDeleteRequest={() => this.handleDelete(patient)}
                  onUpdateRequest={() => this.handleEdit(patient) }
                />
              </li>
            ))}
          </ul>
        )}
      </Fragment>
    )
  }
}
