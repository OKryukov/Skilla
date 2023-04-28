import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { headerReducer } from "./headerReducer";
import { callsReducer } from "./callsReducer";
import { CallsWatcher } from "../DAL/saga";

const sagaMiddleware = createSagaMiddleware()
const reducers = combineReducers({
  header: headerReducer,
  calls: callsReducer,
})
export const store = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(CallsWatcher)
export type StateTape = ReturnType<typeof reducers>
export type DispatchType = typeof store.dispatch