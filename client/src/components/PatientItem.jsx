import React, { Component, Fragment } from 'react'

import Api from './Api'

export default class PatientItem extends Component {
    constructor (props) {
      super(props)
      this.state = {
        editing: false
      }
    }
    updateFormItem (e) {
      this.setState({
        ["form_item_" + e.target.name]: e.target.value 
      })
    }
    enableEdit () {
      this.setState({
        editing: true
      })
    }
    update () {
      this.props.patient.aliasName = this.state.form_item_alias_name
      this.setState({
        editing: false
      })
      this.props.onUpdateRequest()
    }
    render () {
      const { patient } = this.props
  
      let aliasNameEl = patient.aliasName
      let editOrSaveBtn = <button
            className='btn btn-danger'
            onClick={() => this.enableEdit()}
          >
            Edit
          </button>
      if (this.state.editing) {
        aliasNameEl = <input
          type='text'
          defaultValue={aliasNameEl}
          name="alias_name"
          onChange={e => this.updateFormItem(e)}
        />
        editOrSaveBtn = <button
          className='btn btn-danger'
          onClick={() => this.update()}
        >
          Save
        </button>
      }
  
      return <div className='row align-items-center'>
        <div className='col'>
          <div className='row'>Name: {patient.name}</div>
          <div className='row'>
            AliasName: {aliasNameEl}
          </div>
          <div className='row'>Birthday: {patient.birthday}</div>
          <div className='row'>Diagnosis: {patient.diagnosis}</div>
          <div className='row'>Email: {patient.email}</div>
        </div>
        <div className='col-auto'>
          {editOrSaveBtn}
          <button
            className='btn btn-danger'
            onClick={() => this.props.onDeleteRequest(patient)}
          >
            Delete
          </button>
        </div>
      </div>
    }
  }