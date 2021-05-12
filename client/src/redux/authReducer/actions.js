import { SET_AUTH, SET_REGISTER_STATUS } from './actionTypes'

import { loadingTypes, regStatuses } from '../../constants/values'
import { registerSuccess } from '../../constants/alerts'

import makeRequest from '../../helpers/makeRequest'

import { setError, setLoading } from '../loadingReducer/actions'
import { setAlert } from '../alertReducer/actions'

export function setAuth(payload) {
  return {
    type: SET_AUTH,
    payload
  }
}

export function setRegStatus(status) {
  return {
    type: SET_REGISTER_STATUS,
    status
  }
}

export function login(username, password) {
  return async (dispatch) => {
    dispatch(setLoading(true, loadingTypes.auth, 0))
    await makeRequest(
      '/api/auth/auth',
      'POST',
      {
        username,
        password
      },
      (data) => {
        dispatch(setAuth({ ...data, auth: true }))
        localStorage.setItem(loadingTypes.auth, JSON.stringify(data))
        dispatch(setError(null))
        dispatch(setLoading(false, loadingTypes.auth, 0))
      },
      (data) => {
        dispatch(setError(data.message || data.error))
        dispatch(setLoading(false, loadingTypes.auth, 0))
      }
    )
  }
}

export function register(username, password) {
  return async (dispatch) => {
    dispatch(setLoading(true, loadingTypes.auth, 0))
    await makeRequest(
      '/api/auth/add',
      'PUT',
      {
        username,
        password
      },
      () => {
        dispatch(setRegStatus(regStatuses.success))
        dispatch(setError(null))
        dispatch(setAlert(registerSuccess))
      },
      (data) => {
        dispatch(setRegStatus(regStatuses.failed))
        dispatch(setError(data.message || data.error))
      }
    )
    dispatch(setLoading(false, loadingTypes.auth, 0))
  }
}

export function auth(token) {
  return async (dispatch) => {
    await makeRequest(
      '/api/auth/check',
      'POST',
      {
        token
      },
      (data) => {
        dispatch(setAuth({ ...data, auth: true }))
        localStorage.setItem(loadingTypes.auth, JSON.stringify(data))
      },
      () => {
        dispatch(setAuth({}))
        localStorage.setItem(loadingTypes.auth, JSON.stringify({}))
      }
    )
  }
}
