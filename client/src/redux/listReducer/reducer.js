import { DELETE_LIST, UPDATE_LISTS } from './actionTypes'

const listsState = {
  lists: [],
  activeDropzone: 1
}

export default function listReducer(state = listsState, action) {
  switch (action.type) {
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((e) => e.id !== action.id)
      }
    case UPDATE_LISTS:
      return {
        ...state,
        lists: action.lists
      }
    default:
      return state
  }
}
