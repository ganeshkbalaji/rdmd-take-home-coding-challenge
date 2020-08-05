import React, { Component, Fragment } from 'react'

import Api from './Api'

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

  async withError(operation) {
    try {
      return await operation()
    } catch (error) {
      if (!(error instanceof TypeError)) throw error
      this.setState({ error })
    }
  }

  async componentDidMount() {
    this.withError(async () => {
      const patients = await Api.patientList()
      this.setState({ patients })
    })
  }

  async handleEdit(patient) {
    this.withError(async () => {
      await Api.patientDelete(patient.id)
      const patients = this.state.patients.filter(p => p.id !== patient.id)
      this.setState({ patients })
    })
  }

  async handleDelete(patient) {
    this.withError(async () => {
      await Api.patientDelete(patient.id)
      const patients = this.state.patients.filter(p => p.id !== patient.id)
      this.setState({ patients })
    })
  }

  // adds a new patient to the list
  async handleAdd(e) {
    const { name, aliasName, birthday, diagnosis, email } = this.state
    this.withError(async () => {
      if (!name) throw new TypeError('Please provide a name')
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
                <div className='col'></div>
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
                </div>
                <div className='col-auto'>
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
                <div className='row align-items-center'>
                  <div className='col'>
                    <div className='row'>Name: {patient.name}</div>
                    <div className='row'>AliasName: {patient.aliasName}</div>
                    <div className='row'>Birthday: {patient.birthday}</div>
                    <div className='row'>Diagnosis: {patient.diagnosis}</div>
                    <div className='row'>Email: {patient.email}</div>
                  </div>
                  <div className='col-auto'>
                    <button
                      className='btn btn-danger'
                      onClick={() => this.handleEdit(patient)}
                    >
                      Edit
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => this.handleDelete(patient)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Fragment>
    )
  }
}
