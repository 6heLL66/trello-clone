import { DELETE_LIST, UPDATE_LISTS } from './actionTypes'
import { loadingElements, loadingTypes } from '../../constants/values'
import makeRequest from '../../helpers/makeRequest'
import { alertTypes, customAlert } from '../../constants/alerts'
import { setLoading } from '../loadingReducer/actions'

export function deleteList(id) {
  return {
    type: DELETE_LIST,
    id
  }
}

export function updateLists(lists) {
  return {
    type: UPDATE_LISTS,
    lists
  }
}

export function put_lists(data, token, ownerId, id, noupdate) {
  return async (dispatch) => {
    if (noupdate) {
      dispatch(updateLists(data))
    } else {
      dispatch(setLoading(true, loadingTypes.create, loadingElements.list))
    }
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
        if (!noupdate) {
          dispatch(updateLists(data))
        }
      },
      (data) => {
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading(false, loadingTypes.create, loadingElements.list))
  }
}

export function delete_list(id, token) {
  return async (dispatch) => {
    dispatch(setLoading(id, loadingTypes.delete, loadingElements.list))
    await makeRequest(
      `/api/list/delete?id=${id}&token=${token}`,
      'DELETE',
      null,
      () => {
        dispatch(deleteList(id))
      },
      (data) => {
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading('', loadingTypes.delete, loadingElements.list))
  }
}
