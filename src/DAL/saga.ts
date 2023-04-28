import { call, put, takeEvery } from 'redux-saga/effects'
import { AT, actionCreators } from '../BLL/callsReducer'
import { callsAxios } from './ajax'



function* GetCallsWorker():Generator{
  yield console.log('Запускаю GetCallsWorker')
  let calls = yield call(()=>{
    return(
      callsAxios.getCalls()
      .then(res=>res)
    )
  })
  yield put(actionCreators.addCallsAC(calls))
}

export function* CallsWatcher():Generator{
  yield takeEvery(AT.GET_CALLS, GetCallsWorker)
}