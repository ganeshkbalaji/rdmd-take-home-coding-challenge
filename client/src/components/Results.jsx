import React, { Component, Fragment } from 'react'

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

import { withError } from "../util/commonUtil"
  

import Api from './Api'


export default class Results extends Component {
    constructor (props) {
        super(props)
        this.state = {
            patients: [],
          editing: false
        }
      }

    async componentDidMount() {
        withError(async () => {
            const patients = await Api.patientList()
            this.setState({ patients })
        })
    }
    
    render() {
        /*
        const diagnosisMap = this.state.patients.reduce((acc, cPatient) => {
            if (!cPatient.diagnosis) { return acc }
            acc[cPatient.diagnosis] = acc[cPatient.diagnosis] || 0
            ++acc[cPatient.diagnosis]
            return acc
        }, {})
        
        const data = Object.keys(diagnosisMap).map(cKey => ({
            name: cKey,
            count: diagnosisMap[cKey]
        }))

        return(

            <Fragment>
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </Fragment>
        )
        */
       const diagnosisMap = this.state.patients.reduce((acc, cPatient) => {
            if (!cPatient.diagnosis || !cPatient.birthday) { return acc }
            const cDiag = acc[cPatient.diagnosis] = acc[cPatient.diagnosis] || {
                minors: 0,
                adults: 0,
                retired: 0
            }
            
            let age = new Date().getFullYear() - new Date(cPatient.birthday).getFullYear()
            if (age < 0) {
                age = 0
            }

            let group = "retired"
            if (age < 18) {
                group = "minors"
            } else if (age < 65) {
                group = "adults"
            }


            ++cDiag[group]

            return acc
        }, {})
        
        const data = Object.keys(diagnosisMap).map(cKey => ({
            diagnosis: cKey,
            ...diagnosisMap[cKey]
        }))

        return(

            <Fragment>
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="diagnosis" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="minors" fill="#ff007f" />
                    <Bar dataKey="adults" fill="#00c895" />
                    <Bar dataKey="retired" fill="#007bff" />
                </BarChart>
            </Fragment>
        )
    }
}