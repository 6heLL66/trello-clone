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
  RECEIVE_AUTH,
  SET_ALERT,
  SET_AUTH,
  SET_CURRENT_BOARD,
  SET_ERROR,
  SET_LOADING,
  SET_REGISTER_STATUS,
  UNSET_ALERT,
  UPDATE_ITEMS,
  UPDATE_LISTS
} from './actions/actionTypes'
import { combineReducers } from 'redux'
import getUniqueId from '../helpers/getUniqueId'

const boardState = {
  boards: JSON.parse(localStorage.getItem('boards')) || [],
  currentBoard: JSON.parse(localStorage.getItem('current')) || null
}

const listsState = {
  lists: JSON.parse(localStorage.getItem('lists')) || [],
  activeDropzone: 1
}

const itemsState = {
  items: JSON.parse(localStorage.getItem('items')) || []
}

const authState = {
  isAuth: false,
  loading: false,
  error: null
}

function boardReducer(state = boardState, action) {
  let newState = null
  switch (action.type) {
    case CREATE_BOARD:
      action.board.id = getUniqueId(state.boards, 12)
      newState = {
        ...state,
        boards: [...state.boards, action.board]
      }
      localStorage.setItem('boards', JSON.stringify(newState.boards))
      return newState
    case SET_CURRENT_BOARD:
      newState = {
        ...state,
        currentBoard: action.board
      }
      localStorage.setItem('current', JSON.stringify(newState.currentBoard))
      return newState
    case DELETE_BOARD:
      newState = {
        ...state,
        boards: state.boards.filter((e) => e.id !== action.id),
        currentBoard: null
      }
      localStorage.setItem('boards', JSON.stringify(newState.boards))
      return newState
    case CHANGE_BOARD_PROPS: {
      newState = {
        ...state,
        boards: state.boards.map((e, i) => {
          if (e.id === action.board.id) {
            return action.board
          }
          return e
        })
      }
      localStorage.setItem('boards', JSON.stringify(newState.boards))
      return newState
    }
    default:
      return state
  }
}

function listReducer(state = listsState, action) {
  let newState = null
  switch (action.type) {
    case CREATE_NEW_LIST:
      action.list.id = getUniqueId(state.lists, 12)
      action.list.parentId = action.id
      action.list.index = state.lists.filter(
        (e) => e.parentId === action.id
      ).length
      newState = {
        ...state,
        lists: [...state.lists, action.list]
      }
      localStorage.setItem('lists', JSON.stringify(newState.lists))
      return newState
    case DELETE_LIST:
      newState = {
        ...state,
        lists: state.lists.filter((e) => e.id !== action.id)
      }
      localStorage.setItem('lists', JSON.stringify(newState.lists))
      return newState
    case CHANGE_LIST_PROPS:
      newState = {
        ...state,
        lists: state.lists.map((e) => {
          if (e.id === action.list.id) {
            return action.list
          }
          return e
        })
      }
      localStorage.setItem('lists', JSON.stringify(newState.lists))
      return newState
    case UPDATE_LISTS:
      newState = {
        ...state,
        lists: action.lists
      }
      localStorage.setItem('lists', JSON.stringify(newState.lists))
      return newState
    default:
      return state
  }
}

function itemReducer(state = itemsState, action) {
  let newState = null
  switch (action.type) {
    case CREATE_NEW_ITEM:
      action.item.parentId = action.id
      action.item.id = getUniqueId(state.items, 12)
      action.item.index = state.items.filter(
        (e) => e.parentId === action.id
      ).length
      newState = {
        ...state,
        items: [...state.items, action.item]
      }
      localStorage.setItem('items', JSON.stringify(newState.items))
      return newState
    case DELETE_ITEM:
      newState = {
        ...state,
        items: state.items.filter((e) => {
          return e.id !== action.id
        })
      }
      localStorage.setItem('items', JSON.stringify(newState.items))
      return newState
    case CHANGE_ITEM_PROPS:
      newState = {
        ...state,
        items: state.items.map((e) => {
          if (e.id === action.item.id) {
            return action.item
          }
          return e
        })
      }
      localStorage.setItem('items', JSON.stringify(newState.items))
      return newState
    case UPDATE_ITEMS:
      localStorage.setItem('items', JSON.stringify(action.items))
      return {
        ...state,
        items: [...action.items]
      }
    default:
      return state
  }
}

function alertReducer(state = { alert: null }, action) {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alert: action.alert
      }
    case UNSET_ALERT:
      return {
        ...state,
        alert: null
      }
    default:
      return state
  }
}

function authReducer(state = authState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload.auth,
        token: action.payload.token,
        username: action.payload.username,
        userId: action.payload.userId
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.error
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading
      }
    case SET_REGISTER_STATUS:
      return {
        ...state,
        regStatus: action.status
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  boards: boardReducer,
  lists: listReducer,
  items: itemReducer,
  alerts: alertReducer,
  auth: authReducer
})

export default rootReducer
