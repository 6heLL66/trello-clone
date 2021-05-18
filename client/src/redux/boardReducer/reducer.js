import { deleteBoard, putBoard, setBoards, setCurrentBoard } from './functions'
import { createReducer } from '../functions'
import { DELETE_BOARD, PUT_BOARD, SET_BOARDS, SET_CURRENT_BOARD } from './actionTypes'

const initialState = {
  boards: null,
  currentBoard: null
}

const boardReducer = createReducer(initialState, {
  [SET_BOARDS]: setBoards,
  [PUT_BOARD]: putBoard,
  [SET_CURRENT_BOARD]: setCurrentBoard,
  [DELETE_BOARD]: deleteBoard
})

export default boardReducer
