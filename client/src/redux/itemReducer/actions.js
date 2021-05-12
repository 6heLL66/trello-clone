import { loadingElements, loadingTypes } from '../../constants/values'
import makeRequest from '../../helpers/makeRequest'
import { alertTypes, customAlert } from '../../constants/alerts'
import { DELETE_ITEM, UPDATE_ITEMS } from './actionTypes'
import { setLoading } from '../loadingReducer/actions'

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

export function put_items(data, token, ownerId, noupdate) {
  return async (dispatch) => {
    if (noupdate) {
      dispatch(updateItems(data))
    } else {
      dispatch(
        setLoading(data[0].parentId, loadingTypes.create, loadingElements.item)
      )
    }
    await makeRequest(
      `/api/items/put`,
      'PUT',
      {
        data,
        ownerId,
        token
      },
      (data) => {
        if (!noupdate) {
          dispatch(updateItems(data))
        }
      },
      (data) => {
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading(false, loadingTypes.create, loadingElements.item))
  }
}

export function delete_item(id, token) {
  return async (dispatch) => {
    dispatch(setLoading(id, loadingTypes.delete, loadingElements.item))
    await makeRequest(
      `/api/item/delete?id=${id}&token=${token}`,
      'DELETE',
      null,
      () => {
        dispatch(deleteItem(id))
      },
      (data) => {
        dispatch(customAlert(data.error, alertTypes.error))
      }
    )
    dispatch(setLoading('', loadingTypes.delete, loadingElements.item))
  }
}
