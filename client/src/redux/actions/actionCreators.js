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
  SET_CURRENT_BOARD,
  UNSET_ALERT,
  UPDATE_ITEMS,
  UPDATE_LISTS
} from './actionTypes'

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
