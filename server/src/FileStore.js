import fs from 'fs'

//
// This file-based store provides persistence of data structures that are
// serializable in JSON. This store can be cleared by manually deleting the
// underlying file.
//
export default class FileStore {
  data = undefined
  filename = undefined

  constructor(filename) {
    this.filename = filename
  }

  read() {
    if (!fs.existsSync(this.filename)) {
      return undefined
    }
    const json = fs.readFileSync(this.filename, 'utf8')
    const data = JSON.parse(json)
    return data
  }

  write(data) {
    const json = JSON.stringify(data, null, 2)
    fs.writeFileSync(this.filename, json, 'utf8')
  }

  load() {
    const data = this.data || (this.data = this.read() || {})
    if (!data.patients) data.patients = []
    if (!data.counters) data.counters = {}
    return data
  }

  save() {
    this.write(this.data)
  }
}
