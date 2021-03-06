import { DELETE_LIST, UPDATE_LISTS } from './actionTypes'
import { loadingElements, loadingTypes, methods } from '../../constants/values'
import makeRequest from '../../helpers/makeRequest'
import { alertTypes, customAlert } from '../../constants/alerts'
import { setLoading } from '../loadingReducer/actions'

export function deleteListLocal(id) {
  return {
    type: DELETE_LIST,
    id
  }
}

export function updateListsLocal(lists) {
  return {
    type: UPDATE_LISTS,
    lists
  }
}

export function putLists(data, token, ownerId, id, prevLists) {
  return async (dispatch) => {
    if (prevLists) {
      dispatch(updateListsLocal(data))
    } else {
      dispatch(setLoading(true, loadingTypes.create, loadingElements.list))
    }
    await makeRequest(
      `/api/lists/put`,
      methods.PUT,
      {
        data,
        ownerId,
        id,
        token
      },
      (data) => {
        if (!prevLists) {
          dispatch(updateListsLocal(data))
        }
      },
      (data) => {
        if (prevLists) {
          dispatch(updateListsLocal(prevLists))
        }
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading(false, loadingTypes.create, loadingElements.list))
  }
}

export function deleteList(id, token) {
  return async (dispatch) => {
    dispatch(setLoading(id, loadingTypes.delete, loadingElements.list))
    await makeRequest(
      `/api/list/delete?id=${id}&token=${token}`,
      methods.DELETE,
      null,
      () => {
        dispatch(deleteListLocal(id))
      },
      (data) => {
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading('', loadingTypes.delete, loadingElements.list))
  }
}
