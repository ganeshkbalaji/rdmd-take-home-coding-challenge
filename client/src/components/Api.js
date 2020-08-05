import needle from 'needle'
import queryString from 'query-string'

const host = process.env.REACT_APP_SERVER_HOST

export default class Api {
  static async request(method, path, query) {
    const queryPart = query && queryString.stringify(query)
    const pathPart = [host].concat(path).join('/')
    const url = queryPart ? [pathPart, queryPart].join('?') : pathPart
    const { body, statusCode, statusMessage } = await needle(method, url)
    if (statusCode >= 400)
      throw new Error(`Unable to complete: ${statusMessage} ${statusCode}`)
    return body
  }

  static async patientCount() {
    const { count } = await this.request('get', ['patients', 'count'])
    return count
  }

  static async patientList(offset) {
    const { patients } = await this.request('get', ['patients'], { offset })
    return patients
  }

  static async patientAdd({ name, aliasName, birthday, diagnosis, email }) {
    const { patient } = await this.request('post', ['patients'], { name, aliasName, birthday, diagnosis, email })
    return patient
  }

  static async patientDelete(id) {
    // DELETE patient/:id
    const { patient } = await this.request('delete', ['patient', id])
    return patient
  }

  static async patientPatch(id, aliasName) {
    // PATCH patient/:id
    //  - query: aliasName
    const { patient } = await this.request('patch', ['patient', id], { aliasName })
    return patient
  }
}
