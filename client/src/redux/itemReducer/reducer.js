import { deleteItem, updateItems } from './functions'
import { createReducer } from '../functions'
import { DELETE_ITEM, UPDATE_ITEMS } from './actionTypes'

const initialState = {
  items: []
}

const itemReducer = createReducer(initialState, {
  [DELETE_ITEM]: deleteItem,
  [UPDATE_ITEMS]: updateItems
})

export default itemReducer
