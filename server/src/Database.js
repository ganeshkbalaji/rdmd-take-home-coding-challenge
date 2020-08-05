//
// This database implements specific queries as used by the API endpoints. It is
// a very basic implementation with the primary purpose of providing a
// zero-dependency database, and by no means intended for production.
//
export default class Database {
  store = undefined

  constructor(store) {
    this.store = store
  }

  get data() {
    return this.store.load()
  }

  flush() {
    return this.store.save()
  }

  patientCount() {
    const { patients } = this.data
    return patients.length
  }

  patientList(offset) {
    const { patients } = this.data
    return patients.slice(offset, offset + 10)
  }

  patientFind(id) {
    const { patients } = this.data
    return patients.find(patient => patient.id === id)
  }

  patientAdd(name, aliasName, birthday, diagnosis, email) {
    const { patients, counters } = this.data
    counters.patient = (counters.patient || 0) + 1
    const id = counters.patient
    const patient = { id, name, aliasName, birthday, diagnosis, email }
    patients.push(patient)
    this.flush()
    return patient
  }

  patientUpdate(id, name) {
    const { patients } = this.data
    const patient = patients.find(patient => patient.id === id)
    if (!patient) throw new Error('Patient id not found')
    patient.name = name
    this.flush()
    return patient
  }

  patientDelete(id) {
    const { patients } = this.data
    const index = patients.findIndex(patient => patient.id === id)
    if (index < 0) throw new Error('Patient id not found')
    const patient = patients[index]
    patients.splice(index, 1)
    this.flush()
    return patient
  }

  patientPatch(id, aliasName) {
    const { patients } = this.data
    const patient = patients.find(patient => patient.id === id)
    if (!patient) throw new Error('Patient id not found')
    patient.aliasName = aliasName
    this.flush()
    return patient
  }
}
