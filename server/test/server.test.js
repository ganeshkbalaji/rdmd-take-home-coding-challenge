import Database from '../src/Database'
import FileStore from '../src/FileStore'

jest.mock('../src/FileStore', () => {
  return function (patients) {
    return {
      load: () => ({ patients }),
      counters: {},
    }
  }
})

describe('Database', () => {
  describe('counting patients', () => {
    test('returns the number of patients in the database', () => {
      const store = new FileStore([{}])
      const database = new Database(store)
      expect(database.patientCount()).toEqual(1)
    })
  })

  describe('finding a patient', () => {
    test('by id', () => {
      const patient = { id: 1, name: 'Maya' }

      const store = new FileStore([patient])
      const database = new Database(store)
      expect(database.patientFind(1)).toEqual(patient)
    })
  })

  describe('listing patients', () => {
    test('returns the patients in the database', () => {
      const patient1 = { name: 'Maya' }
      const patient2 = { name: 'Bernie' }
      const patients = [patient1, patient2]
      const store = new FileStore(patients)
      const database = new Database(store)
      expect(database.patientList(0)).toEqual(patients)
    })

    test('accepts a non-zero offset', () => {
      const patient1 = { name: 'Maya' }
      const patient2 = { name: 'Bernie' }
      const patients = [patient1, patient2]
      const store = new FileStore(patients)
      const database = new Database(store)
      expect(database.patientList(1)).toEqual([patient2])
    })
  })

  describe('patient add', () => {
    test('with all params', () => {
      const name = 'Maya'
      const aliasName = 'testMaya'
      const birthday = '2020-05-20'
      const diagnosis = 'nf2'
      const email = 'maya@rdmd.com'
      const state = { name, aliasName, birthday, diagnosis, email}
      const store = new FileStore()

      const database = new Database(store)
      expect(database.patientCount()).toEqual(0)

      database.patientAdd(name, aliasName, birthday, diagnosis, email)
      expect(database.patientCount()).toEqual(1)
      expect(database.patientFind(1)).toEqual(state)
    })
  })
})
