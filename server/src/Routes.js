import Database from './Database'
import FileStore from './FileStore'

const filename = './database.json'

export default class Routes {
  static setup(app) {
    const store = new FileStore(filename)
    const database = new Database(store)

    app.get('/patients/count', (req, res) => {
      const count = database.patientCount()
      res.json({ count })
    })

    app.get('/patients', (req, res) => {
      const { offset = 0 } = req.query
      const patients = database.patientList(offset)
      res.json({ patients })
    })

    app.get('/patient/:id', (req, res) => {
      const { id } = req.params
      const patient = database.patientFind(parseInt(id, 10))
      res.json({ patient })
    })

    app.post('/patients', (req, res) => {
      const { name, birthday, diagnosis, email } = req.query
      const patient = database.patientAdd(name, birthday, diagnosis, email)
      res.json({ patient })
    })

    app.put('/patient/:id', (req, res) => {
      const { id, name } = req.params
      const patient = database.patientUpdate(parseInt(id, 10), name)
      res.json({ patient })
    })

    app.delete('/patient/:id', (req, res) => {
      const { id } = req.params
      const patient = database.patientDelete(parseInt(id, 10))
      res.json({ patient })
    })
  }
}
