import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from 'formik'
import moment from 'moment'

export default function TodoComponent(){
    const {id} = useParams()
    
    const authContext = useAuth()
    const username = authContext.username

    const navigate = useNavigate()

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    useEffect(
        () => retrieveTodos(),
        //id값이 변경될 때에만 이게 새로고침 되도록 하려고 함
        [id]
    )

    function retrieveTodos(){
        

        //id가 -1인 경우 새로운거
        if(id != -1){
            retrieveTodoApi(username, id)
            //이제는 response를 다룸
            // .then(response => console.log(response))
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch(error => console.log(error)
            )
        }
    }
    //여기부터 formik moment 사용
    function onSubmit(values){
        console.log(values)
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        console.log(todo)


        if(id==-1){
            createTodoApi(username, todo)
                .then(response => {
                    console.log(response)
                    navigate('/todos')
                })
                .catch(error => console.log(error))
        }
        else{
            //업데이트가 되면 todo로 자동으로 navigate 되도록 -> usenavigate
            updateTodoApi(username, id, todo)
                .then(response => {
                    console.log(response)
                    navigate('/todos')
                })
                .catch(error => console.log(error))
        }
    }

    function validate(values){
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid targetDate'
        }
        if(values.description.length<5){
            errors.description = 'Enter atleast 5 characters'
        }
        //moment는 의존성에 추가해서 (프레임워크) targetDate가 유효한지 확인할 수 있음
        if(values.targetDate == '' || values.targetDate == null || !moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter a target date'
        }
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                {/* formik 안에서 jsx를 리턴하는 함수를 정의함 
                표시하려는 jsx를 이 함수의 리턴 값으로서 리턴하는거임
                그리고 이 함수는 props를 입력값으로 받고 jsx를 리턴함 */}
                <Formik initialValues={ {description, targetDate} }
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    //이건 내가 입력을 하나 하나 할 때 계속 검증이 일어나는데 이걸 안되게 하는거
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <ErrorMessage 
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                {/* 하나는 description용 */}
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>
                                {/* 하나는 targetDate용 */}
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}