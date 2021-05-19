import { createStore, applyMiddleware, compose } from 'redux'
import { logger } from 'redux-logger/src'

import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), applyMiddleware(logger))
)
if (window.Cypress) {
  window.store = store
}


export default store


