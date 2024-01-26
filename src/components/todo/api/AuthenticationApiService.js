import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService 
    = (token) => apiClient.get(`/basicauth`, 
    {
        headers:{
            Authorization: token
        }
    })


    //이제는 프론트엔드에서 JWT 인증 사용하는 방법
export const executeJwtAuthenticationService 
//post를 줘야 됨 (username 이랑 password를 줘서 token을 얻음)
    = (username, password) => apiClient.post(`/authenticate`, {username, password})