import { deleteItemInArray, updateObject } from '../functions'

export function deleteList(state, action) {
  return updateObject(state, {
    lists: deleteItemInArray(state.lists, action.id)
  })
}

export function updateLists(state, action) {
  return updateObject(state, {
    lists: action.lists
  })
}