import { useEffect, useState } from "react";
import { retrieveAllTodosForUsername, deleteTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent(){

    const today = new Date();

    const navigate = useNavigate()

    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay());

    const [todos, setTodos] = useState([])

    //message 출력을 위한 state
    const [message, setMessage] = useState(null)

    const authContext = useAuth()
    const username = authContext.username

    // const todos = [
    //     // {id: 1, description: 'Learn AWS', done: false, targetDate:targetDate},
    //     // {id: 2, description: 'Learn Full Stack Dev', done: false, targetDate:targetDate},
    //     // {id: 3, description: 'Learn DevOps', done: false, targetDate:targetDate},
    // ]

    // 시작할 때 실행됨
    // 일반적으로 데이터를 로딩하려 할 때는 컴포넌트, 컴포넌트의 최초 버전이 준비되자마자 렌더링이됨
    // []는 dependency설정(여기서는 뭐 없음)
    useEffect (
        () => refreshTodos(), []
    )

    function refreshTodos() {
        retrieveAllTodosForUsername(username)
            .then( (response) => setTodos(response.data))  //그게 성공이라면 then을 함
            .catch( (error) => console.log(error)) //실패면 catch
            //.finally( () => console.log('cleanup')) //성공이든 실패든 실행
    }
    
    function deleteTodo(id) {
        console.log('delete ' + id)
        deleteTodoApi(username, id)
            .then(
                //1: Display message
                //2: Update todos
                () => {
                    setMessage(`Delete of todo with ${id} successful`)
                    refreshTodos()
                }
            )
            .catch(error => console.log(error))
    }

    function updateTodo(id){
        console.log('update')
        navigate(`/todos/${id}`)
    }

    function addNewTodo(){
        console.log('addtodo')
        //하드코딩해서 -1이 아닌경우만 todocomponent에서 다룸
        navigate('/todos/-1')
    }

    return (
        // <div className="ListTodosComponent">
        //아래는 bootstrap 적용을 위해 변경
        <div className="container"> 
            <h1>Things You Want To Do</h1>
            {/* message 가 있을 때만 띄우기 위해 && */}
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                {/* className='table' 는 없던거 */}
                <table className='table'>
                    {/* 테이블 헤더 thead */}
                    <thead>
                        {/* 행 tr */}
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    {/* 테이블 바디 tbody */}
                    <tbody>
                    {/* 동적 값을 넣어줌(여러개의 todo를 보여주기 위해) */}
                    {
                        todos.map(
                            todo => (
                                // 리액트에서는 리스트를 사용할 때 각 요소가 유일한 키를 갖는게 좋음
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    {/* 객체는 리액트의 자식이 될 수 없어서 toDateString을 해줌 */}
                                    <td>{todo.targetDate.toString()}</td>
                                    {/* onClick에 id를 전달하기 위해 화살표 함수 사용 */}
                                    <td> <button className="btn btn-warning" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                    <td> <button className="btn btn-success" onClick={()=>updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )
                        )
                    }
                        {/* <tr>
                            <td>{todos.id}</td>
                            <td>{todos.description}</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
            {/* 화살표 함수는 안에 param있을때만 쓰는듯
            화살표 함수를 안쓰면 화면이 뜰 때 함수가 실행되는데 이건 또 아닌거같고 */}
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}

export default ListTodosComponent