import { loadingTypes } from '../../constants/values'
import { setAuth, setError, setRegisterStatus } from './functions'
import { createReducer } from '../functions'
import { SET_AUTH, SET_REGISTER_STATUS } from './actionTypes'
import { SET_ERROR } from '../loadingReducer/actionTypes'

const initialState = {
  isAuth:
    !!JSON.parse(localStorage.getItem(loadingTypes.auth)) &&
    !!JSON.parse(localStorage.getItem(loadingTypes.auth)).token,
  error: null
}

const authReducer = createReducer(initialState, {
  [SET_AUTH]: setAuth,
  [SET_ERROR]: setError,
  [SET_REGISTER_STATUS]: setRegisterStatus
})

export default authReducer
