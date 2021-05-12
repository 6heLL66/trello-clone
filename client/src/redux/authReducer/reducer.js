import { loadingTypes } from '../../constants/values'
import { SET_AUTH, SET_REGISTER_STATUS } from './actionTypes'
import { SET_ERROR } from '../loadingReducer/actionTypes'

const authState = {
  isAuth:
    !!JSON.parse(localStorage.getItem(loadingTypes.auth)) &&
    !!JSON.parse(localStorage.getItem(loadingTypes.auth)).token,
  error: null
}

export default function authReducer(state = authState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload.auth,
        token: action.payload.token,
        username: action.payload.senderName,
        userId: action.payload.userId
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      }
    case SET_REGISTER_STATUS:
      return {
        ...state,
        regStatus: action.status
      }
    default:
      return state
  }
}
