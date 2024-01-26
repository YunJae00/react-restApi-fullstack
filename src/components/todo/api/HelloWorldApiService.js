import axios from "axios"

import { apiClient } from "./ApiClient"
// export function retrieveHelloWorldBean (){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

//계속 반복데는 url
// const apiClient = axios.create(
//     {
//         baseURL: 'http://localhost:8080'
//     }
// )

//이렇게도 가능 (이게 보기 편함)
export const retrieveHelloWorldBean 
    = () => axios.get('http://localhost:8080/hello-world-bean')

//이거는 prams들어가서 ' 이거 아니라 ` 가 들어감
// export const retrieveHelloWorldPathVariable 
//     //이런식으로 apiClient 이용 가능
//     = (username) => apiClient.get(`/hello-world/path-variable/${username}`)

//CSRF 설정 이후
export const retrieveHelloWorldPathVariable 
    //이런식으로 apiClient 이용 가능
    = (username, token) => apiClient.get(`/hello-world/path-variable/${username}`, {
        //즉 우리가 retrieveHelloWorldPathVariable을 호출할 때 우리가 넣어주고 있는 이 토큰을 넣지 않으려 하고요
        headers:{
            // 이건 api tester에서 받아옴 -> 참고.txt 
            // 이런 하드코딩된 토큰을 원치 않음
            // 그래서 username이랑 context에서 token을 받아옴
            //Authorization: 'Basic aW4yOG1pbnV0ZXM6ZHVtbXk='
            Authorization: token //이제 이걸 사용하는 곳에서 token을 줌
        }
    })

//하드코딩된 인증을 삭제하고 이젠 기본 인증을 추가하려함
export const executeBasicAuthenticationService 
    = (token) => apiClient.get(`/basicauth`, {
        headers:{
            Authorization: token
        }
    })