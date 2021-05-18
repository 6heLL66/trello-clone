import {
  DELETE_BOARD,
  PUT_BOARD,
  SET_CURRENT_BOARD,
  SET_BOARDS
} from './actionTypes'
import {
  alertTypes,
  boardCreatedAlert,
  boardDeletedAlert,
  customAlert
} from '../../constants/alerts'

import { loadingElements, loadingTypes, methods } from '../../constants/values'
import makeRequest from '../../helpers/makeRequest'

import { setLoading } from '../loadingReducer/actions'
import { setAlert } from '../alertReducer/actions'
import { updateListsLocal } from '../listReducer/actions'
import { updateItemsLocal } from '../itemReducer/actions'

export function putBoardLocal(board) {
  return {
    type: PUT_BOARD,
    board
  }
}

export function setBoardsLocal(boards) {
  return {
    type: SET_BOARDS,
    boards
  }
}

export function setCurrentBoard(board) {
  return {
    type: SET_CURRENT_BOARD,
    board
  }
}

export function deleteBoardLocal(id) {
  return {
    type: DELETE_BOARD,
    id
  }
}

export function fetchBoards(id) {
  return async (dispatch) => {
    dispatch(setLoading(true, loadingTypes.loadData, loadingElements.boards))
    await makeRequest(
      `/api/boards/get?id=${id}`,
      methods.GET,
      null,
      (data) => {
        dispatch(setBoardsLocal(data))
      },
      (data) => {
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading(false, loadingTypes.loadData, loadingElements.boards))
  }
}

export function putBoard(board, token, prevBoard) {
  return async (dispatch) => {
    dispatch(setLoading(true, loadingTypes.create, loadingElements.board))
    if (board.id) {
      dispatch(setLoading(board.id, loadingTypes.colors, loadingElements.board))
    }
    await makeRequest(
      `/api/board/createOrChange`,
      methods.PUT,
      {
        ...board,
        token
      },
      (data) => {
        dispatch(putBoardLocal(data))
        if (!board.id) {
          dispatch(setAlert(boardCreatedAlert))
        }
      },
      (data) => {
        if (prevBoard) {
          dispatch(putBoardLocal(prevBoard))
        }
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading(false, loadingTypes.create, loadingElements.board))
    dispatch(setLoading('', loadingTypes.colors, loadingElements.board))
  }
}

export function deleteBoard(id, token) {
  return async (dispatch) => {
    dispatch(setLoading(id, loadingTypes.delete, loadingElements.board))
    await makeRequest(
      `/api/board/delete?id=${id}&token=${token}`,
      methods.DELETE,
      null,
      () => {
        dispatch(setAlert(boardDeletedAlert))
        dispatch(deleteBoardLocal(id))
      },
      (data) => {
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading('', loadingTypes.delete, loadingElements.board))
  }
}

export function getBoard(id) {
  return async (dispatch) => {
    dispatch(setLoading(true, loadingTypes.loadData, loadingElements.lists))
    await makeRequest(
      `/api/board/get?id=${id}`,
      'GET',
      null,
      (data) => {
        dispatch(setCurrentBoard(data.board))
        dispatch(updateListsLocal(data.lists))
        dispatch(updateItemsLocal(data.items))
      },
      (data) => {
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading(false, loadingTypes.loadData, loadingElements.lists))
  }
}
