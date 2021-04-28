import {
  CHANGE_BOARD_PROPS,
  CHANGE_ITEM_PROPS,
  CHANGE_LIST_PROPS,
  CREATE_NEW_ITEM,
  CREATE_NEW_LIST,
  DELETE_BOARD,
  DELETE_ITEM,
  DELETE_LIST,
  PUT_BOARD,
  SET_ALERT,
  SET_AUTH,
  SET_BLOCKED_COLORS,
  SET_BOARDS,
  SET_CURRENT_BOARD,
  SET_ERROR,
  SET_LOADING,
  SET_REGISTER_STATUS,
  UNSET_ALERT,
  UPDATE_ITEMS,
  UPDATE_LISTS
} from './actionTypes'
import makeRequest from '../../helpers/makeRequest'

export function putBoard(board) {
  return {
    type: PUT_BOARD,
    board
  }
}

export function setBlockedColors(id) {
  return {
    type: SET_BLOCKED_COLORS,
    id
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

export function setAlert(alert) {
  return {
    type: SET_ALERT,
    alert
  }
}

export function unsetAlert() {
  return {
    type: UNSET_ALERT
  }
}

export function changeBoardProps(board) {
  return {
    type: CHANGE_BOARD_PROPS,
    board
  }
}

export function createNewList(list, id) {
  return {
    type: CREATE_NEW_LIST,
    list,
    id
  }
}

export function deleteList(id) {
  return {
    type: DELETE_LIST,
    id
  }
}

export function changeList(list) {
  return {
    type: CHANGE_LIST_PROPS,
    list
  }
}

export function createNewItem(item, id) {
  return {
    type: CREATE_NEW_ITEM,
    item,
    id
  }
}

export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    id
  }
}

export function changeItemProps(item) {
  return {
    type: CHANGE_ITEM_PROPS,
    item
  }
}

export function updateItems(items) {
  return {
    type: UPDATE_ITEMS,
    items
  }
}

export function updateLists(lists) {
  return {
    type: UPDATE_LISTS,
    lists
  }
}

export function setAuth(payload) {
  return {
    type: SET_AUTH,
    payload
  }
}

export function setLoading(loading, index) {
  return {
    type: SET_LOADING,
    loading,
    index
  }
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error
  }
}

export function setRegStatus(status) {
  return {
    type: SET_REGISTER_STATUS,
    status
  }
}

export function setBoards(boards) {
  return {
    type: SET_BOARDS,
    boards
  }
}

export function login(username, password) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      await makeRequest(
        '/api/auth/auth',
        'POST',
        {
          username,
          password
        },
        (data) => {
          dispatch(setAuth({ ...data, auth: true }))
          localStorage.setItem('auth', JSON.stringify(data))
          dispatch(setError(null))
          dispatch(setLoading(false))
        },
        (data) => {
          dispatch(setError(data.message || data.error))
          dispatch(setLoading(false))
        }
      )
    } catch (e) {
      dispatch(setError(e.message))
      dispatch(setLoading(false))
    }
  }
}

export function register(username, password) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      await makeRequest(
        '/api/auth/add',
        'POST',
        {
          username,
          password
        },
        (data) => {
          dispatch(setRegStatus('success'))
          dispatch(setError(null))
        },
        (data) => {
          dispatch(setRegStatus('failed'))
          dispatch(setError(data.message || data.error))
        }
      )
      dispatch(setLoading(false))
    } catch (e) {
      dispatch(setError(e.message))
      dispatch(setLoading(false))
    }
  }
}

export function auth(token) {
  return async (dispatch) => {
    try {
      await makeRequest(
        '/api/auth/check',
        'POST',
        {
          token
        },
        (data) => {
          dispatch(setAuth({ ...data, auth: true }))
          localStorage.setItem('auth', JSON.stringify(data))
        },
        () => {
          dispatch(setAuth({}))
          localStorage.setItem('auth', JSON.stringify({}))
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
}

export function fetch_boards(id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true, 0))
      await makeRequest(
        `/api/boards/get?id=${id}`,
        'GET',
        null,
        (data) => {
          dispatch(setBoards(data))
        },
        (data) => {
          console.log(data.error)
        }
      )
      dispatch(setLoading(false, 0))
    } catch (e) {
      console.log(e)
      dispatch(setLoading(false, 0))
    }
  }
}

export function put_board(board, token) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true, 1))
      if (board.id) {
        dispatch(setBlockedColors(board.id))
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
        },
        (data) => {
          console.log(data.error)
        }
      )
      dispatch(setLoading(false, 1))
      dispatch(setBlockedColors(null))
    } catch (e) {
      console.log(e)
      dispatch(setLoading(false, 1))
      dispatch(setBlockedColors(null))
    }
  }
}

export function delete_board(id, token) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true, 2))
      await makeRequest(
        `/api/board/delete?id=${id}&token=${token}`,
        'DELETE',
        null,
        (data) => {
          dispatch(deleteBoard(id))
        },
        (data) => {
          console.log(data.error)
        }
      )
      dispatch(setLoading(false, 2))
    } catch (e) {
      console.log(e.message)
      dispatch(setLoading(false, 2))
    }
  }
}

export function get_board(id) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true, 3))
      await makeRequest(
        `/api/board/get?id=${id}`,
        'GET',
        null,
        (data) => {
          dispatch(setCurrentBoard(data))
        },
        (data) => {
          console.log(data.error)
        }
      )
      dispatch(setLoading(false, 3))
    } catch (e) {
      console.log(e.message)
      dispatch(setLoading(false, 3))
    }
  }
}
