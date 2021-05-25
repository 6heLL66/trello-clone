import { setLoading } from './function'
import { createReducer } from '../functions'
import { SET_LOADING } from './actionTypes'

const initialState = {
  loadData: {
    boards: false,
    lists: false
  },
  create: {
    board: false,
    list: false,
    item: false
  },
  delete: {
    board: '',
    list: '',
    item: ''
  },
  colors: {
    board: ''
  },
  auth: {
    form: false
  }
}

const loadingReducer = createReducer(initialState, {
  [SET_LOADING]: setLoading
})

export default loadingReducer
