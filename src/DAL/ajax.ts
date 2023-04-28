import axios from "axios";

const baseUrl = 'https://api.skilla.ru/mango/getList'
const myAxios = axios.create({baseURL:baseUrl, headers:{Authorization:'Bearer testtoken'}, params:{limit:100}})


export const callsAxios = {
  getCalls(){
    return(
      myAxios.post(``,)
      .then(res=>res.data.results)
      .catch(error=>console.log(error))
    )
  }
}
