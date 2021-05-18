export function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues)
}

export function updateOrCreateItemInArray(array, itemId, item) {
  let updated = false
  const updatedItems = array.map((e) => {
    if (e.id === itemId) {
      updated = true
      return item
    }
    return e
  })

  return updated ? updatedItems : [...array, item]
}

export function deleteItemInArray(array, itemId) {
  return array.filter((item) => item.id !== itemId)
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }
    return state
  }
}
