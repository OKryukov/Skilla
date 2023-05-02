import { FC, useEffect } from "react"
import { DispatchType, StateTape } from "../../BLL/store"
import { Calls } from "./calls"
import { actionCreators } from "../../BLL/callsReducer"
import { compose } from "redux"
import { connect } from "react-redux"


const CallsAPI:FC<any> = (props)=>{
  const {getList, defaultCallsList} = props
  useEffect(()=>{
    getList()
  },[])
  return(
    <Calls defaultCallsList={defaultCallsList}/>
  )
}

const mapStateToProps = (state:StateTape)=>{
  return({
    defaultCallsList: state.calls.callsList,
  })
  
}

const mapDispatchToProps = (dispatch:DispatchType)=>{
  return({
    getList(){
      dispatch(actionCreators.getCallsAsyncAC())
    }
  })
}

export const CallsContainer = compose(connect(mapStateToProps,mapDispatchToProps)(CallsAPI))