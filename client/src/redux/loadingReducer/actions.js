import { SET_ERROR, SET_LOADING } from './actionTypes'

export function setLoading(loading, loadingType, loadingElement) {
  return {
    type: SET_LOADING,
    loading,
    loadingType,
    loadingElement
  }
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error
  }
}
