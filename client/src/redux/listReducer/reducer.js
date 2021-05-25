import { deleteList, updateLists } from './functions'
import { createReducer } from '../functions'
import { DELETE_LIST, UPDATE_LISTS } from './actionTypes'

const initialState = {
  lists: []
}

const listReducer = createReducer(initialState, {
  [DELETE_LIST]: deleteList,
  [UPDATE_LISTS]: updateLists
})

export default listReducer
