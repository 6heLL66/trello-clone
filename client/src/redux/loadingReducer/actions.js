import { SET_ERROR, SET_LOADING } from './actionTypes'

export function setLoading(loading, field, index) {
  return {
    type: SET_LOADING,
    loading,
    field,
    index
  }
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error
  }
}
