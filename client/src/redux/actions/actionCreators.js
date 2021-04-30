import {
  PUT_BOARD,
  DELETE_BOARD,
  DELETE_ITEM,
  DELETE_LIST,
  SET_ALERT,
  SET_AUTH,
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

export function deleteList(id) {
  return {
    type: DELETE_LIST,
    id
  }
}

export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    id
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

export function setLoading(loading, field, index) {
  return {
    type: SET_LOADING,
    loading,
    field,
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
    dispatch(setLoading(true, 'auth', 0))
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
        dispatch(setLoading(false, 'auth', 0))
      },
      (data) => {
        dispatch(setError(data.message || data.error))
        dispatch(setLoading(false, 'auth', 0))
      }
    )
  }
}

export function register(username, password) {
  return async (dispatch) => {
    dispatch(setLoading(true, 'auth', 0))
    await makeRequest(
      '/api/auth/add',
      'PUT',
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
    dispatch(setLoading(false, 'auth', 0))
  }
}

export function auth(token) {
  return async (dispatch) => {
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
  }
}

export function fetch_boards(id) {
  return async (dispatch) => {
    dispatch(setLoading(true, 'loadData', 0))
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
    dispatch(setLoading(false, 'loadData', 0))
  }
}

export function put_board(board, token) {
  return async (dispatch) => {
    dispatch(setLoading(true, 'create', 0))
    if (board.id) {
      dispatch(setLoading(board.id, 'colors', 0))
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
    dispatch(setLoading(false, 'create', 0))
    dispatch(setLoading('', 'colors', 0))
  }
}

export function delete_board(id, token) {
  return async (dispatch) => {
    dispatch(setLoading(id, 'delete', 0))
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
    dispatch(setLoading('', 'delete', 0))
  }
}

export function get_board(id) {
  return async (dispatch) => {
    dispatch(setLoading(true, 'loadData', 1))
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
        console.log(data.error)
      }
    )
    dispatch(setLoading(false, 'loadData', 1))
  }
}

export function put_lists(data, token, ownerId, id, noupdate) {
  return async (dispatch) => {
    if (noupdate) dispatch(updateLists(data))
    else dispatch(setLoading(true, 'create', 1))
    await makeRequest(
      `/api/lists/put`,
      'PUT',
      {
        data,
        ownerId,
        id,
        token
      },
      (data) => {
        if (!noupdate) dispatch(updateLists(data))
      },
      (data) => {
        console.log(data.error)
      }
    )
    dispatch(setLoading(false, 'create', 1))
  }
}

export function delete_list(id, token) {
  return async (dispatch) => {
    dispatch(setLoading(id, 'delete', 1))
    await makeRequest(
      `/api/list/delete?id=${id}&token=${token}`,
      'DELETE',
      null,
      () => {
        dispatch(deleteList(id))
      },
      (data) => {
        console.log(data.error)
      }
    )
    dispatch(setLoading('', 'delete', 1))
  }
}

export function put_items(data, token, ownerId, noupdate) {
  return async (dispatch) => {
    if (noupdate) dispatch(updateItems(data))
    else dispatch(setLoading(data[0].parentId, 'create', 2))
    await makeRequest(
      `/api/items/put`,
      'PUT',
      {
        data,
        ownerId,
        token
      },
      (data) => {
        if (!noupdate) dispatch(updateItems(data))
      },
      (data) => {
        console.log(data.error)
      }
    )
    dispatch(setLoading(false, 'create', 2))
  }
}

export function delete_item(id, token) {
  return async (dispatch) => {
    dispatch(setLoading(id, 'delete', 2))
    await makeRequest(
      `/api/item/delete?id=${id}&token=${token}`,
      'DELETE',
      null,
      () => {
        dispatch(deleteItem(id))
      },
      (data) => {
        console.log(data.error)
      }
    )
    dispatch(setLoading('', 'delete', 2))
  }
}
