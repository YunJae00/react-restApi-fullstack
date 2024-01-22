import { createContext, useContext, useState } from "react";

//
//headerConponent에서 예시를 보여줌
//

//1.Context 생성
//2.Context 에 State 넣기
//3.다른 생성된 Component들과 Context 공유

//1.Context 생성
export const AuthContext = createContext()

//누군가 컴포넌트를 사용하고자 하면 사용할 수 있는 간단한 hook를 생성
//어떤 클래스에서 인증 컨텍스트를 사용하고 싶다면 useAuth hook을 이용
//리액트 프로젝트에서 대부분 표준으로 사용하는것
export const useAuth = () => useContext(AuthContext)

//const authContext = useContext(AuthContext)

//이 한수로 다른 컴포넌트에 컨텍스트를 제공
//이 함수는 JSX를 반환함 여기에는 이 컨텍스트를 다른 컴포넌트에 제공해야함
//AuthProvider가 여기세서 하는 일은 모든 자식을 감싸는 것 그래서 {children} , AuthProvider 아래 모든 자식은 저 변수에 할당됨
//2.Context 에 State 넣기
export default function AuthProvider({children}){

    const [number, setNumber] = useState(10)

    //10초마다 number를 1 증가시킴
    //setInterval(() => setNumber(number+1), 10000)
    
    const [isAuthenticated, setAuthenticated] = useState(false)

    //const valueToBeShared = {number, isAuthenticated, setAuthenticated}
    //이런식으로 가능하다 (js에서는) 근데 리액트에서는 잘 안씀

    //loginConponent에 있던걸 refactoring
    //그리고 아래의 context에도 전달해줌
    function login(username, password){
        if(username==='in28minutes' && password==='dummy'){
            //authContext.setAuthenticated(true)
            setAuthenticated(true)
            return true;

            //아래꺼는 다 loginConponent에서 할 거
            //setShowSuccessMessage(true);
            //setShowErrorMessage(false);
            ////navigate('/welcome'); //useNavigate 이거로 다른 페이지를 탐색할 수 있음 (위치를 변경하는 명령 메서드를 반환)
            //navigate(`/welcome/${username}`); //변수를 넣고싶으면 ${}, 그리고 이 부분이 변수 값으로 대체되려면, `을 써야함
        }
        else{
            //authContext.setAuthenticated(false)
            setAuthenticated(false)
            return false
            
            //setShowSuccessMessage(false);
            //setShowErrorMessage(true);
        }
    }

    function logout(){
        setAuthenticated(false)
    }

    return (
        // number를 다른 컴포넌트에 모두 주고 싶음 ex headercomponent를 예시로 듬
        // 이제는 컴포넌트에서 isAuthenticated, setAuthenticated에 접근할 수 있게 함
        //원래는 setAuthenticated있었는데 없어도됨 (login이랑 logout을 여기로 빼서)
        <AuthContext.Provider value={ {number, isAuthenticated, login, logout} }> 
            {children}
        </AuthContext.Provider>
    )
}