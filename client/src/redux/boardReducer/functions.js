import {
  deleteItemInArray,
  updateObject,
  updateOrCreateItemInArray
} from '../functions'

export function setBoards(state, action) {
  return updateObject(state, {
    boards: action.boards
  })
}

export function putBoard(state, action) {
  return updateObject(state, {
    boards: updateOrCreateItemInArray(
      state.boards,
      action.board.id,
      action.board
    )
  })
}

export function setCurrentBoard(state, action) {
  return updateObject(state, {
    currentBoard: action.board
  })
}

export function deleteBoard(state, action) {
  console.log('STATE DELETE', state)
  return updateObject(state, {
    boards: deleteItemInArray(state.boards, action.id)
  })
}
