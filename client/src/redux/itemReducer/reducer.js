import { DELETE_ITEM, UPDATE_ITEMS } from './actionTypes'

const itemsState = {
  items: []
}

export default function itemReducer(state = itemsState, action) {
  switch (action.type) {
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((e) => {
          return e.id !== action.id
        })
      }
    case UPDATE_ITEMS:
      return {
        ...state,
        items: [...action.items]
      }
    default:
      return state
  }
}
