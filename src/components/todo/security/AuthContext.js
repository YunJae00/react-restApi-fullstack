import { createContext, useContext, useState } from "react";
//import { executeBasicAuthenticationService } from "../api/HelloWorldApiService";
import { executeBasicAuthenticationService, executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){
    
    const [isAuthenticated, setAuthenticated] = useState(false)

    //Context에 username 설정
    const [username, setUsername] = useState(null)

    //token 설정
    const [token, setToken] = useState(null)

    // function login(username, password){
    //     if(username==='in28minutes' && password==='dummy'){
    //         setUsername(username)
    //         setAuthenticated(true)
    //         return true;
    //     }
    //     else{
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }
    //이젠 실제로 username과 password를 받아와서 토큰을 생성하고 그 토읔을 인증 헤더로서 전송하고 /basizauth라는 url 호출하려함
    //그리고 올바른 응답을 받으면 그때 토큰을 컨텍스트에 저장할거임
    
    // async function login(username, password){

    //     //이렇게 토큰을 생성하고 서비스를 호출함
    //     //'Basic aW4yOG1pbnV0ZXM6ZHVtbXk=' 이런식
    //     //그리고 Base64인코딩 (*정확하게 해줘야됨*)
    //     const baToken = 'Basic ' + window.btoa(username + ":" + password)
    //     //그리고 이걸 Context에 설정해서 우리고 api호출을 할 때 이 토큰을 다시 사용할 수 있음
    //     // await executeBasicAuthenticationService(baToken)
    //     //     .then(response=>console.log("2:" + response))
    //     //     .catch(error=>console.log(error))

    //     // console.log('1 : test')
    //     //이러면 1 , 2 순서로 나옴 근데 이 메서드는 우리는 응답을 받을 때까지 실행을 중지시키고 받으면 true를 리턴하길 원함 -> async 메서드로 만들어야됨
        
    //     //이러면 결과 : {data: 'Success', status: 200, statusText: '', headers: AxiosHeaders, config: {…}, …}
    //     //다른 아이디 치면 CORS 정책에 의해 차단되었다고 나옴

    //     try{
    //         const response = await executeBasicAuthenticationService(baToken)

    //         if(response.status==200){
    //             setUsername(username)
    //             setAuthenticated(true)
    //             setToken(baToken)

    //             //모든 api클라이언트에서 호출을 가로채고 인증 헤더를 설정해야함 그래서 직접 AuthCOntext 에서 해줄거임
    //             //api클라이언트에 공통 토큰을 설정
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and adding a token')
    //                     config.headers.Authorization = baToken
    //                     return config
    //                     //요청 설정에 인증 헤더를 추가하고 있음
    //                 }
    //                 //이제 다른 페이지 가면 요청에 성공하는걸 볼 수 있음
    //             )
    //             return true;
    //         }
    //         else{
    //             //logout()으로 대체 가능
    //             setAuthenticated(false)
    //             setUsername(null)
    //             setToken(null)
    //             return false
    //         }
    //     } catch(error){
    //         //logout()으로 대체 가능
    //         setAuthenticated(false)
    //         setUsername(null)
    //         setToken(null)
    //         return false
    //     }

    //     // if(executeBasicAuthenticationService){
    //     //     setUsername(username)
    //     //     setAuthenticated(true)
    //     //     return true;
    //     // }
    //     // else{
    //     //     setAuthenticated(false)
    //     //     setUsername(null)
    //     //     return false
    //     // }
    // }

    //이젠 JWT 사용
    async function login(username, password){

        //const baToken = 'Basic ' + window.btoa(username + ":" + password)
        //token을 만들 필요 없음

        try{
            const response = await executeJwtAuthenticationService(username, password)

            if(response.status==200){
                const jwtToken = 'Bearer ' + response.data.token
                setUsername(username)
                setAuthenticated(true)
                //JWT는 좀 다름
                setToken(jwtToken)
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )
                return true;
            }
            else{
                logout()
                return false
            }
        } catch(error){
            logout()
            return false
        }

    }

    function logout(){
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, token} }> 
            {children}
        </AuthContext.Provider>
    )
}