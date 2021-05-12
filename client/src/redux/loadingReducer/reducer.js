import { SET_LOADING } from './actionTypes'

const loadingState = {
  loadData: [false, false, false],
  create: [false, false, false],
  delete: ['', '', ''],
  colors: [''],
  auth: [false]
}

export default function loadingReducer(state = loadingState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        [action.field]: state[action.field].map((e, i) => {
          return i === action.index && action.loading
        })
      }
    default:
      return state
  }
}
