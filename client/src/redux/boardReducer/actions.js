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

import { loadingElements, loadingTypes } from '../../constants/values'
import makeRequest from '../../helpers/makeRequest'

import { setLoading } from '../loadingReducer/actions'
import { setAlert } from '../alertReducer/actions'
import { updateLists } from '../listReducer/actions'
import { updateItems } from '../itemReducer/actions'

export function putBoard(board) {
  return {
    type: PUT_BOARD,
    board
  }
}

export function setBoards(boards) {
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

export function deleteBoard(id) {
  return {
    type: DELETE_BOARD,
    id
  }
}

export function fetch_boards(id) {
  return async (dispatch) => {
    dispatch(setLoading(true, loadingTypes.loadData, loadingElements.boards))
    await makeRequest(
      `/api/boards/get?id=${id}`,
      'GET',
      null,
      (data) => {
        dispatch(setBoards(data))
      },
      (data) => {
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading(false, loadingTypes.loadData, loadingElements.boards))
  }
}

export function put_board(board, token) {
  return async (dispatch) => {
    dispatch(setLoading(true, loadingTypes.create, loadingElements.board))
    if (board.id) {
      dispatch(setLoading(board.id, loadingTypes.colors, loadingElements.board))
    }
    await makeRequest(
      `/api/board/createOrChange`,
      'PUT',
      {
        ...board,
        token
      },
      (data) => {
        dispatch(putBoard(data))
        if (!board.id) {
          dispatch(setAlert(boardCreatedAlert))
        }
      },
      (data) => {
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading(false, loadingTypes.create, loadingElements.board))
    dispatch(setLoading('', loadingTypes.colors, loadingElements.board))
  }
}

export function delete_board(id, token) {
  return async (dispatch) => {
    dispatch(setLoading(id, loadingTypes.delete, loadingElements.board))
    await makeRequest(
      `/api/board/delete?id=${id}&token=${token}`,
      'DELETE',
      null,
      (data) => {
        dispatch(setAlert(boardDeletedAlert))
        dispatch(deleteBoard(id))
      },
      (data) => {
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading('', loadingTypes.delete, loadingElements.board))
  }
}

export function get_board(id) {
  return async (dispatch) => {
    dispatch(setLoading(true, loadingTypes.loadData, loadingElements.lists))
    await makeRequest(
      `/api/board/get?id=${id}`,
      'GET',
      null,
      (data) => {
        dispatch(setCurrentBoard(data.board))
        dispatch(updateLists(data.lists))
        dispatch(updateItems(data.items))
      },
      (data) => {
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading(false, loadingTypes.loadData, loadingElements.lists))
  }
}
