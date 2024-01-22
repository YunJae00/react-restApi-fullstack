import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext, useAuth } from './security/AuthContext'
function HeaderComponent(){

    //이런식으로 하면 어디서든 컨텍스트에 있는 State를 서로 다른 컴포넌트에서 공유할 수 있음
    // const authContext =  useContext(AuthContext)
    // console.log(authContext.number)


    //아래는 바꾼거
    const authContext = useAuth()
    console.log(authContext.number)

    const isAuthenticated = authContext.isAuthenticated

    //console.log(authContext) 
    //const [isAuthenticated, setAuthenticated] = useState(false) 이렇게 하면 {number: 11, isAuthenticated: false, setAuthenticated: ƒ}이런식으로 나옴
    //그래서 객체를 만들어줌

    //로그아웃 버튼을 눌렀을 때 실행될 함수
    function logout(){
        authContext.logout()
    }

    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.in28minutes.com">in28minutes</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    {/* 로그인이 되어있을 때만 보이게 */}
                                    {isAuthenticated &&
                                        <Link className="nav-link" to="/welcome/in28minutes">Home</Link>}
                                </li>
                                <li className="nav-item fs-5">
                                    {isAuthenticated &&
                                        <Link className="nav-link" to="/todos">Todos</Link>}
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                {!isAuthenticated &&
                                    <Link className="nav-link" to="/login">Login</Link>}
                            </li>
                            <li className="nav-item fs-5">
                                {isAuthenticated &&
                                    <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent