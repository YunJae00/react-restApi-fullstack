import { useState } from 'react'
import './TodoApp.css'
import {BrowserRouter, Routes, Route, useNavigate, useParams, Link, Navigate} from 'react-router-dom'
//로그인 컴포넌트를 위한 url과 웰컴 컴포넌트를 위한 url을 구성함
//react-router-dom 에 정의된 또 다른 hook -> useNavigate 이거로 다른 페이지를 탐색할 수 있음 (위치를 변경하는 명령 메서드를 반환)
//useParams는 라우팅 경로에 해당하는 현재 url에서 동적 파라미터인 키/값 쌍을 객체로 반환

import LogoutComponent from './LogoutComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorComponent from './ErrorComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import TodoComponent from './TodoComponent'

import AuthProvider, { useAuth } from './security/AuthContext'


//로그인된 상태에서 보여주는 라우터를 관리
function AuthenticatedRoute({children}){
    const authContext = useAuth()
    //사용자가 인증되어있을 때만 children을 반환 (안에 감싸고 있는 div를 반환한다는 뜻일듯?)
    if(authContext.token)
    return(
        children
    )
    //그게 아니라면 로그인페이지로 이동
    return <Navigate to="/" />
}

export default function TodoApp(){
    return (
        <div className="TodoApp">
            <AuthProvider>
                {/* <HeaderComponent/> */}
                <BrowserRouter>
                    {/* 여기로 놔야 link를 이용 가능 footer도 마찬가지*/}
                    <HeaderComponent/>
                    <Routes>
                        {/* 각 컴포넌트에 url이 연결되어있음 */}
                        <Route path='/' element={ <LoginComponent /> }></Route>
                        <Route path='/login' element={ <LoginComponent /> }></Route>
                        {/* useParams는 라우팅 경로에 해당하는 현재 url에서 동적 파라미터인 키/값 쌍을 객체로 반환 */}
                        아래 3개의 라우터는 사용자가 인증되었을 때만 보여야함
                        <Route path='/welcome/:username' element={ 
                            <AuthenticatedRoute>
                                <WelcomeComponent /> 
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/todos' element={ 
                            <AuthenticatedRoute>
                                <ListTodosComponent /> 
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/todos/:id' element={ 
                            <AuthenticatedRoute>
                                <TodoComponent /> 
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/logout' element={ 
                            <AuthenticatedRoute>
                                <LogoutComponent /> 
                            </AuthenticatedRoute>
                        }/>
                        {/* 주로 에러 컴포넌트는 마지막에 넣음 */}
                        <Route path='*' element={ <ErrorComponent /> }></Route> 
                    </Routes>
                    {/* <FooterComponent/> */}
                </BrowserRouter>
                {/* <LoginComponent />
                <WelcomeComponent /> */}
            </AuthProvider>
        </div>
    )
}

// function LoginComponent(){

//     const [username, setUsername] = useState('in28minutes');  //이 state 값에 접근할 수 있는 변수(username) , username을 업데이타할 메서드(setUsername)
//     const [password, setPassword] = useState('password'); //password도 동일하게
    
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false); //사용자 인증 성공/실패
//     const [showErrorMessage, setShowErrorMessage] = useState(false); 

//     const navigate = useNavigate(); //useNavigate 이거로 다른 페이지를 탐색할 수 있음 (위치를 변경하는 명령 메서드를 반환)

//     //변경이 있을 때 마다 onChange가 호출되고 handelUsernameChange메서드를 호출함 -> state가 업데이트되면서 입력칸에도 올바른 값으로 바뀜
//     function handleUsernameChange(event) {
//         setUsername(event.target.value);
//     }

//     function handlePasswordChange(event) {
//         setPassword(event.target.value);
//     }

//     function handelSubmit(){
//         if(username==='in28minutes' && password==='dummy'){
//             setShowSuccessMessage(true);
//             setShowErrorMessage(false);
//             //navigate('/welcome'); //useNavigate 이거로 다른 페이지를 탐색할 수 있음 (위치를 변경하는 명령 메서드를 반환)
//             navigate(`/welcome/${username}`); //변수를 넣고싶으면 ${}, 그리고 이 부분이 변수 값으로 대체되려면, `을 써야함
//         }
//         else{
//             setShowSuccessMessage(false);
//             setShowErrorMessage(true);
//         }
//     }

//     function SuccessMessageComponent(){
//         if(showSuccessMessage) {
//             return <div className="successMessage">Authenticated Successfully</div>
//         }
//         return null
//     }

//     function ErrorMessageComponent(){
//         if(showErrorMessage) {
//             return <div className="errorMessage">Authenticated Failed</div>
//         }
//         return null
//     }

//     return (
        
//         <div className="Login">
//             <h1>Welcome to Login</h1>
//             {/* 사용자 인증에 성공하면 이 메시지를 보여줌 */}
//             {/* <div className="successMessage">Authenticated Successfully</div>
//             <div className="errorMessage">Authenticated Failed</div> */}
//             <SuccessMessageComponent />
//             <ErrorMessageComponent />


//             {/* 코드가 짧을 경우 아래와 같이도 가능함
//             true && String -> String
//             false && String -> false
//             {showSuccessMessage && <div className="successMessage">Authenticated Successfully</div>}
//             {showErrorMessage && <div className="errorMessage">Authenticated Failed</div>} */}


//             <div>
//                 {/* value넣어서 하면 바뀌지가 않음 ( 제어할 수 없는 입력 값을 바꾸려고 함)
//                 정의되지 않은 값이 정의된 값으로 바뀌면서 생길 수 있음
//                 -> 컴포넌트가 살아있는 동안 입력 요소를 제어할 지 제어하지 않을지 선택
//                 리엑트에는 컴포넌트 제어라는 개념이 있음
//                 하나는 React State / 두번째는 양식 요소 자체의 값 DOM 값 */}
//                 <label>User name</label>
//                 <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
//             </div>
//             <div>
//                 <label>Password</label>
//                 <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
//             </div>
//             <div>
//                 <button type="button" name="login" onClick={handelSubmit}>Login</button>
//             </div>
//         </div>
//     )
// }


// function WelcomeComponent(){

//     const params = useParams();
//     console.log(params); //{username: 'in28minutes'}를 반환함
//     console.log(params.username) //in28minutes를 반환 (하드코딩되어있음)

//     //이렇게도 가능 (객체를 직접 받는 대신 객체의 값을 받는거임)
//     const {username} = useParams();
//     console.log(username) //in28minutes를 반환 (하드코딩되어있음)

//     return (
//         <div className="WelcomeComponent">
//             {/* <h1>Welcome to Homepage</h1> */}
//             <h1>Welcome {username}</h1>
//             <div>
//                 {/* Manage your todos - <a href="/todos">Go here</a>
//                 이건 최선의 방법이 아님(전체 페이지가 새로고침 되기 때문) */}
//                 Manage your todos - <Link to="/todos">Go here</Link>
//                 {/* 여기서 link를 사용하면 react router dom에서 온 것이 아니라 임포트 해줘야함 */}
//                 {/* link를 이용해서 하면 network 탭에 들어가서 새로고침 되지 않는 것을 볼 수 있음 */}
//             </div>
//         </div>
//     )
// }

// function ErrorComponent(){
//     return (
//         <div className="ErrorComponent">
//             <h1>We are working really hard!</h1>
//             <div>
//                 Apologies for the 404.
//             </div>
//         </div>
//     )
// }

// function ListTodosComponent(){

//     const today = new Date();

//     const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay());

//     const todos = [
//         {id: 1, description: 'Learn AWS', done: false, targetDate:targetDate},
//         {id: 2, description: 'Learn Full Stack Dev', done: false, targetDate:targetDate},
//         {id: 3, description: 'Learn DevOps', done: false, targetDate:targetDate},
//     ]

//     return (
//         // <div className="ListTodosComponent">
//         //아래는 bootstrap 적용을 위해 변경
//         <div className="container"> 
//             <h1>Things You Want To Do</h1>
//             <div>
//                 {/* className='table' 는 없던거 */}
//                 <table className='table'>
//                     {/* 테이블 헤더 thead */}
//                     <thead>
//                         {/* 행 tr */}
//                         <tr>
//                             <td>ID</td>
//                             <td>Description</td>
//                             <td>Is Done?</td>
//                             <td>Target Date</td>
//                         </tr>
//                     </thead>
//                     {/* 테이블 바디 tbody */}
//                     <tbody>
//                     {/* 동적 값을 넣어줌(여러개의 todo를 보여주기 위해) */}
//                     {
//                         todos.map(
//                             todo => (
//                                 // 리액트에서는 리스트를 사용할 때 각 요소가 유일한 키를 갖는게 좋음
//                                 <tr key={todo.id}>
//                                     <td>{todo.id}</td>
//                                     <td>{todo.description}</td>
//                                     <td>{todo.done.toString()}</td>
//                                     {/* 객체는 리액트의 자식이 될 수 없어서 toDateString을 해줌 */}
//                                     <td>{todo.targetDate.toDateString()}</td>
//                                 </tr>
//                             )
//                         )
//                     }
//                         {/* <tr>
//                             <td>{todos.id}</td>
//                             <td>{todos.description}</td>
//                         </tr> */}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }


function HeaderComponentExample(){
    // bootstrap에 맞춰서 스타일링 header tag추가함 +App.css
    return (
        //이거는 설명을 위해서 한거 -> 아래의 코드가 만들어진거임
        <header className="header">
            <div className='container'>
                {/* bootstrap 클래스가 정의된거 사용 */}
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        {/* 이거는 전혀 다른 웹사이트임 이거는 a 태그를 사용 */}
                        <a className='nav-link' href="https://www.in28minutes.com">in28minutes</a>
                    </li>
                    <li className='nav-item'>
                        {/* 이거는 단일페이지 애플리케이션 내부 링크임 그래서 link로 연결할 수 있음 */}
                        {/* 근데 여기서 중요한게 usehref는 오직 router컴포넌트 안에서 사용할 수 있어서 headercomponent 위치를 BrowserRouter 안으로 넣어줘야함 */}
                        {/* link는 라우터 요소에서만 사용할 수 있음 */}
                        <Link className='nav-link' to="/welcome/in28minutes">Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to="/todos">Todos</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to="/logout">Logout</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to="/login">Login</Link>
                    </li>
                </ul>
                

            </div>
        </header>
    )
}

// function HeaderComponent(){
//     return(
//         <header className="border-bottom border-light border-5 mb-5 p-2">
//             <div className="container">
//                 <div className="row">
//                     <nav className="navbar navbar-expand-lg">
//                         <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">in28minutes</a>
//                         <div className="collapse navbar-collapse">
//                             <ul className="navbar-nav">
//                                 <li className="nav-item fs-5"><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>
//                                 <li className="nav-item fs-5"><Link className="nav-link" to="/todos">Todos</Link></li>
//                             </ul>
//                         </div>
//                         <ul className="navbar-nav">
//                             <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>
//                             <li className="nav-item fs-5"><Link className="nav-link" to="/logout">Logout</Link></li>
//                         </ul>
//                     </nav>
//                 </div>
//             </div>
//         </header>
//     )
// }

// function FooterComponent(){
//     // bootstrap에 맞춰서 스타일링 footer tag추가함 +App.css
//     return (
//         <footer className="footer">
//             <div className="container">
//                 Your Footer
//             </div>
//         </footer>
//     )
// }

// function LogoutComponent(){
//     return (
//         <div className="LogoutComponent">
//             <h1>You are logged out!</h1>
//             <div>
//                 Thank you for using our App.
//             </div>
//         </div>
//     )
// }