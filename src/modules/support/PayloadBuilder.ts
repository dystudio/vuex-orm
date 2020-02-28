import { Create, Insert, Update, InsertOrUpdate } from '../payloads/Actions'

export type PersistPayload = Create | Insert | Update | InsertOrUpdate

export default class PayloadBuilder {
  /**
   * Create downstream payload from input data to determine the style of data
   * being provided for downward compatibility.
   */
  static createPersistPayload (payload: PersistPayload): PersistPayload {
    // If the payload is an array, then the payload should be an array of
    // data therefore the whole payload should be declared as `data`.
    if (Array.isArray(payload)) {
      return { data: payload }
    }

    // If the payload doesn't have a `data` property, it can be assumed that
    // the user has passed an object as the payload therefore the entire
    // payload should be declared as `data`
    if (payload.data === undefined) {
      return { data: payload }
    }

    // It can safely be assumed the user is providing payload with `data` intact.
    return payload
  }
}