import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
import { retrieveHelloWorldBean, retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

function WelcomeComponent(){

    const {username} = useParams();

    const [message, setMessage] = useState(null);

    //token 가져오기
    const authContext = useAuth()

    function callHelloWorldRestApi(){
        
        //리액트를 사용할 때 rest api호출하기 위해 가장 널리 사용하는 프레임워크 axios
        //npm install axios --save
        // axios.get('http://localhost:8080/hello-world') //axios.get은 Promise를 리턴하고 
        //     .then( (response) => successfulResponse(response))  //그게 성공이라면 then을 함
        //     .catch( (error) => errorResponse(error)) //실패면 catch
        //     .finally( () => console.log('cleanup')) //성공이든 실패든 실행

        //다른 url로 받아보기
        // axios.get('http://localhost:8080/hello-world-bean') //axios.get은 Promise를 리턴하고 
        // retrieveHelloWorldBean() //이렇게 파일 분리 가능
        //     .then( (response) => successfulResponse(response))  //그게 성공이라면 then을 함
        //     .catch( (error) => errorResponse(error)) //실패면 catch
        //     .finally( () => console.log('cleanup')) //성공이든 실패든 실행

        retrieveHelloWorldPathVariable('ranga', authContext.token) //일단 하드코딩
            .then( (response) => successfulResponse(response))  //그게 성공이라면 then을 함
            .catch( (error) => errorResponse(error)) //실패면 catch
            .finally( () => console.log('cleanup')) //성공이든 실패든 실행
    }    
    //이러면 localhost3000 에서 localhost8080을 호출하고 있는건데 이건 한 웹사이트에서 다른 웹사이트를 호출하는거랑 비슷 -> 이걸 기본값으로 차단되어있음
    //이런걸 크로스 오리진 리퀘스트라 부름 CORS
    //크로스 오리진 리퀘스트에 관한 설정도 역시 CORS 설정이라고 부름
    //그리고 그걸 WebMvcConfigurer라는 클래스에서 정의함
    //이제 eclipse에서 설정
    //그럼 Ctrl+Shift+T 또는 Cmd+Shift+T를 누르고 모두 대문자로 WMC라고 검색
    //그리고 여기 CORS 매핑을 추가하는 메서드가 보일 겁니다 즉 addCorsMappings()
    //그럼 이걸 이용하면 크로스 오리진 리퀘스트 처리를 '전역적으로' 설정할 수 있음
    //그걸 하기 위해 우린 WebMvcConfigurer에 관한 Bean을 정의할 거고요, 거기서 우리는 커스텀 설정을 통해 이 특정한 메서드를 오버라이드함
    function successfulResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error){
        console.log(error)
    }

    return (
        <div className="WelcomeComponent">
            {/* <h1>Welcome to Homepage</h1> */}
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button className='btn btn-success m-5' onClick={callHelloWorldRestApi}>
                    Call Hello World
                </button>
            </div>
            <div className='texe-info'>{message}</div>
        </div>
    )
}

export default WelcomeComponent