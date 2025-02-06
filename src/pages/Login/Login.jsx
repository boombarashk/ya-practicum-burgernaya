import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../services/reducers/profile";
import Form from "../../components/Form/Form";

export default function LoginPage() {
    const dispatch = useDispatch()

    return (<Form formName='login'
        title='Вход'
        fields={[
            {inputType: 'email', placeholder: 'E-mail', inputName: 'email'},
            {inputType: 'password', placeholder: 'Пароль', inputName: 'password'}
        ]}
        buttons={[
            {text: 'Войти', handleClick: (formData) => {
                dispatch(fetchLogin(formData))
            }}
        ]}>
            <p className='text text_type_main-small text_color_inactive'>Вы &mdash; новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
            <p className='text text_type_main-small text_color_inactive'>Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></p>
    </Form>)
}