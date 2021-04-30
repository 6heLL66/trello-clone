import {
  DELETE_BOARD,
  DELETE_ITEM,
  DELETE_LIST,
  PUT_BOARD,
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
} from './actions/actionTypes'
import { combineReducers } from 'redux'

const boardState = {
  boards: [],
  currentBoard: null
}

const loadingState = {
  loadData: [false, false, false],
  create: [false, false, false],
  delete: ['', '', ''],
  colors: [''],
  auth: [false]
}

const listsState = {
  lists: [],
  activeDropzone: 1
}

const itemsState = {
  items: []
}

const authState = {
  isAuth:
    !!JSON.parse(localStorage.getItem('auth')) &&
    !!JSON.parse(localStorage.getItem('auth')).token,
  error: null
}

function loadingReducer(state = loadingState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        [action.field]: state[action.field].map((e, i) => {
          return i === action.index && action.loading
        })
      }
    default:
      return state
  }
}

function boardReducer(state = boardState, action) {
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
              if (e.id === action.board.id) return action.board
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

function listReducer(state = listsState, action) {
  switch (action.type) {
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((e) => e.id !== action.id)
      }
    case UPDATE_LISTS:
      return {
        ...state,
        lists: action.lists
      }
    default:
      return state
  }
}

function itemReducer(state = itemsState, action) {
  switch (action.type) {
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((e) => {
          return e.id !== action.id
        })
      }
    case UPDATE_ITEMS:
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
        username: action.payload.senderName,
        userId: action.payload.userId
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.error
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
  auth: authReducer,
  loading: loadingReducer
})

export default rootReducer
