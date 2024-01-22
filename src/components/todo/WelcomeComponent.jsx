import {useParams, Link} from 'react-router-dom'

function WelcomeComponent(){

    const params = useParams();
    console.log(params); //{username: 'in28minutes'}를 반환함
    console.log(params.username) //in28minutes를 반환 (하드코딩되어있음)

    //이렇게도 가능 (객체를 직접 받는 대신 객체의 값을 받는거임)
    const {username} = useParams();
    console.log(username) //in28minutes를 반환 (하드코딩되어있음)

    return (
        <div className="WelcomeComponent">
            {/* <h1>Welcome to Homepage</h1> */}
            <h1>Welcome {username}</h1>
            <div>
                {/* Manage your todos - <a href="/todos">Go here</a>
                이건 최선의 방법이 아님(전체 페이지가 새로고침 되기 때문) */}
                Manage your todos - <Link to="/todos">Go here</Link>
                {/* 여기서 link를 사용하면 react router dom에서 온 것이 아니라 임포트 해줘야함 */}
                {/* link를 이용해서 하면 network 탭에 들어가서 새로고침 되지 않는 것을 볼 수 있음 */}
            </div>
        </div>
    )
}

export default WelcomeComponent