import axios from "axios"

//많은 api호출을 하고 있는데 api호출을 하 때마다 인증을 위해 토큰을 전송하고 싶은데 이걸 일반화하는 방법
//모든 api클라이언트에서 호출을 가로채고 인증 헤더를 설정해야함 그래서 직접 AuthCOntext 에서 해줄거임
export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)