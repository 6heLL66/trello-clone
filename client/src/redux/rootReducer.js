import boardReducer from './boardReducer/reducer'
import listReducer from './listReducer/reducer'
import itemReducer from './itemReducer/reducer'
import alertReducer from './alertReducer/reducer'
import authReducer from './authReducer/reducer'
import loadingReducer from './loadingReducer/reducer'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  boards: boardReducer,
  lists: listReducer,
  items: itemReducer,
  alerts: alertReducer,
  auth: authReducer,
  loading: loadingReducer
})

export default rootReducer
