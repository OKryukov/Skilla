const initialState = {
  date: '',
  callsList: [] as [] | any,
}
export type InitialStateType = typeof initialState

export const AT = {
  GET_CALLS:'calls/GET_CALLS',
  ADD_CALLS:'calls/ADD_CALLS',
} as const
export const actionCreators ={
  addCallsAC(callsList:any){return {type:AT.ADD_CALLS, payload:callsList}},
  getCallsAsyncAC(){return {type:AT.GET_CALLS}},
}

type ActionsTypes = ReturnType<typeof actionCreators[keyof typeof actionCreators]>

export const callsReducer = ( state = initialState, action:ActionsTypes):InitialStateType =>{
  switch(action.type){
    case AT.ADD_CALLS:
      console.log(action.payload)
      return{...state, callsList:action.payload}
    default:
      return state
  }
}