import { updateObject } from '../functions'

export function setAuth(state, action) {
  return updateObject(state, {
    isAuth: action.payload.auth,
    token: action.payload.token,
    username: action.payload.senderName,
    userId: action.payload.userId
  })
}

export function setRegisterStatus(state, action) {
  return updateObject(state, {
    regStatus: action.status
  })
}

export function setError(state, action) {
  return updateObject(state, {
    error: action.error
  })
}
