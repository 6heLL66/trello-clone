import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger/src'

export default createStore(
  rootReducer,
  compose(applyMiddleware(thunk), applyMiddleware(logger))
)
