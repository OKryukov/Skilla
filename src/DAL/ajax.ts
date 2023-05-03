import axios from "axios";
import { getCallsAsyncActionType } from "../BLL/callsReducer";

const baseUrl = 'https://api.skilla.ru/mango/getList'

export const callsAxios = {
  getCalls(action:getCallsAsyncActionType){
    const { type, source } = action.payload
    const headers = {
      'Authorization':'Bearer testtoken'
    }
    const params = {
      limit:200,
      from_type:[type?type:null],
      sources:[source?source:null],
    }
    return(
      axios.post(baseUrl,null, {headers, params})
      .then(res=>res.data.results)
      .catch(error=>console.log(error))
    )
  },
  getEmployees(){
    const headers = {
      'Authorization':'Bearer testtoken'
    }
    const params = {}
    return(
      axios.post('https://api.skilla.ru/partnership/getPersonsList',null, {headers})
      .then(res=>res.data.results)
      .catch(error=>console.log(error))
    )
  }
}
