import {useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from './security/AuthContext';

function LoginComponent(){

    const [username, setUsername] = useState('in28minutes');  //이 state 값에 접근할 수 있는 변수(username) , username을 업데이타할 메서드(setUsername)
    const [password, setPassword] = useState('password'); //password도 동일하게
    
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); //사용자 인증 성공/실패
    const [showErrorMessage, setShowErrorMessage] = useState(false); 

    const navigate = useNavigate(); //useNavigate 이거로 다른 페이지를 탐색할 수 있음 (위치를 변경하는 명령 메서드를 반환)

    const authContext = useAuth() //context 사용

    //변경이 있을 때 마다 onChange가 호출되고 handelUsernameChange메서드를 호출함 -> state가 업데이트되면서 입력칸에도 올바른 값으로 바뀜
    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    //async await 는 authContext에서 사용해서
    async function handelSubmit(){
        if(await authContext.login(username, password)){
            navigate(`/welcome/${username}`);
        }
        else{
            setShowErrorMessage(true);
        }

        // if(username==='in28minutes' && password==='dummy'){

        //     authContext.setAuthenticated(true)

        //     setShowSuccessMessage(true);
        //     setShowErrorMessage(false);
        //     //navigate('/welcome'); //useNavigate 이거로 다른 페이지를 탐색할 수 있음 (위치를 변경하는 명령 메서드를 반환)
        //     navigate(`/welcome/${username}`); //변수를 넣고싶으면 ${}, 그리고 이 부분이 변수 값으로 대체되려면, `을 써야함
        // }
        // else{
        //     authContext.setAuthenticated(false)
            
        //     setShowSuccessMessage(false);
        //     setShowErrorMessage(true);
        // }
    }

    function SuccessMessageComponent(){
        if(showSuccessMessage) {
            return <div className="successMessage">Authenticated Successfully</div>
        }
        return null
    }

    function ErrorMessageComponent(){
        if(showErrorMessage) {
            return <div className="errorMessage">Authenticated Failed</div>
        }
        return null
    }

    return (
        
        <div className="Login">
            <h1>Welcome to Login</h1>
            {/* 사용자 인증에 성공하면 이 메시지를 보여줌 */}
            {/* <div className="successMessage">Authenticated Successfully</div>
            <div className="errorMessage">Authenticated Failed</div> */}
            <SuccessMessageComponent />
            <ErrorMessageComponent />


            {/* 코드가 짧을 경우 아래와 같이도 가능함
            true && String -> String
            false && String -> false
            {showSuccessMessage && <div className="successMessage">Authenticated Successfully</div>}
            {showErrorMessage && <div className="errorMessage">Authenticated Failed</div>} */}


            <div>
                {/* value넣어서 하면 바뀌지가 않음 ( 제어할 수 없는 입력 값을 바꾸려고 함)
                정의되지 않은 값이 정의된 값으로 바뀌면서 생길 수 있음
                -> 컴포넌트가 살아있는 동안 입력 요소를 제어할 지 제어하지 않을지 선택
                리엑트에는 컴포넌트 제어라는 개념이 있음
                하나는 React State / 두번째는 양식 요소 자체의 값 DOM 값 */}
                <label>User name</label>
                <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
            </div>
            <div>
                <button type="button" name="login" onClick={handelSubmit}>Login</button>
            </div>
        </div>
    )
}

export default LoginComponent