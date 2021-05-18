import { updateObject } from '../functions'

export function setAlert(state, action) {
  return updateObject(state, { alert: action.alert })
}

export function unsetAlert(state) {
  return updateObject(state, { alert: null })
}