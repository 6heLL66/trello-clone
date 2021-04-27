import {
  CHANGE_BOARD_PROPS,
  CHANGE_ITEM_PROPS,
  CHANGE_LIST_PROPS,
  CREATE_BOARD,
  CREATE_NEW_ITEM,
  CREATE_NEW_LIST,
  DELETE_BOARD,
  DELETE_ITEM,
  DELETE_LIST,
  SET_ALERT,
  SET_AUTH,
  SET_CURRENT_BOARD,
  SET_ERROR,
  SET_LOADING,
  SET_REGISTER_STATUS,
  UNSET_ALERT,
  UPDATE_ITEMS,
  UPDATE_LISTS
} from './actionTypes'
import makeRequest from '../../helpers/makeRequest'

export function createBoard(board) {
  return {
    type: CREATE_BOARD,
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

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading
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
