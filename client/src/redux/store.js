import { createStore, applyMiddleware, compose } from 'redux'
import { logger } from 'redux-logger/src'

import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

export default createStore(
  rootReducer,
  compose(applyMiddleware(thunk), applyMiddleware(logger))
)
