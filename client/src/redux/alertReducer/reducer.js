import { SET_ALERT, UNSET_ALERT } from './actionTypes'

export default function alertReducer(state = { alert: null }, action) {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alert: action.alert
      }
    case UNSET_ALERT:
      return {
        ...state,
        alert: null
      }
    default:
      return state
  }
}
