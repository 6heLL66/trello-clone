import {
  DELETE_BOARD,
  PUT_BOARD,
  SET_BOARDS,
  SET_CURRENT_BOARD
} from './actionTypes'

const boardState = {
  boards: null,
  currentBoard: null
}

export default function boardReducer(state = boardState, action) {
  switch (action.type) {
    case SET_BOARDS:
      return {
        ...state,
        boards: action.boards
      }
    case PUT_BOARD:
      return {
        ...state,
        boards: state.boards.find((e) => e.id === action.board.id)
          ? state.boards.map((e) => {
              if (e.id === action.board.id) {
                return action.board
              }
              return e
            })
          : [...state.boards, action.board]
      }
    case SET_CURRENT_BOARD:
      return {
        ...state,
        currentBoard: action.board
      }
    case DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((e) => e.id !== action.id)
      }
    default:
      return state
  }
}
