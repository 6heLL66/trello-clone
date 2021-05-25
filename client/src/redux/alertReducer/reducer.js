import { setAlert, unsetAlert } from './functions'
import { createReducer } from '../functions'
import { SET_ALERT, UNSET_ALERT } from './actionTypes'

const initialState = {
  alert: null
}

const alertReducer = createReducer(initialState, {
  [SET_ALERT]: setAlert,
  [UNSET_ALERT]: unsetAlert
})

export default alertReducer
