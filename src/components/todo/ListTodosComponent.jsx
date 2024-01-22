function ListTodosComponent(){

    const today = new Date();

    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDay());

    const todos = [
        {id: 1, description: 'Learn AWS', done: false, targetDate:targetDate},
        {id: 2, description: 'Learn Full Stack Dev', done: false, targetDate:targetDate},
        {id: 3, description: 'Learn DevOps', done: false, targetDate:targetDate},
    ]

    return (
        // <div className="ListTodosComponent">
        //아래는 bootstrap 적용을 위해 변경
        <div className="container"> 
            <h1>Things You Want To Do</h1>
            <div>
                {/* className='table' 는 없던거 */}
                <table className='table'>
                    {/* 테이블 헤더 thead */}
                    <thead>
                        {/* 행 tr */}
                        <tr>
                            <td>ID</td>
                            <td>Description</td>
                            <td>Is Done?</td>
                            <td>Target Date</td>
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
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    {/* 객체는 리액트의 자식이 될 수 없어서 toDateString을 해줌 */}
                                    <td>{todo.targetDate.toDateString()}</td>
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
        </div>
    )
}

export default ListTodosComponent