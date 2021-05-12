import { SET_LOADING } from './actionTypes'

const loadingState = {
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

export default function loadingReducer(state = loadingState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        [action.loadingType]: {
          ...state[action.loadingType],
          [action.loadingElement]: action.loading
        }
      }
    default:
      return state
  }
}
