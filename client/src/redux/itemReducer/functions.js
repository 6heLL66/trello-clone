import { deleteItemInArray, updateObject } from '../functions'

export function deleteItem(state, action) {
  return updateObject(state, {
    items: deleteItemInArray(state.items, action.id)
  })
}

export function updateItems(state, action) {
  return updateObject(state, {
    items: action.items
  })
}