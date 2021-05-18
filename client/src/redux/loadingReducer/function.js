import { updateObject } from '../functions'

export function setLoading(state, action) {
  return updateObject(state, {
    [action.loadingType]: {
      ...state[action.loadingType],
      [action.loadingElement]: action.loading
    }
  })
}