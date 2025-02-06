import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRestore } from "../../services/reducers/profile";
import Form from "../../components/Form/Form";
import { STORAGE_PWD_RESET } from "../../consts";

export default function RestorePwdPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (<Form formName='restorepwd'
        title='Восстановление пароля'
        fields={[
            {inputType: 'email', placeholder: 'Укажите e-mail', inputName: 'email'},
        ]}
        buttons={[
            {text: 'Восстановить', handleClick: (formData) => {
                dispatch(fetchRestore(formData)).then((res) =>{
                    if (res.payload?.success){
                        localStorage.setItem(STORAGE_PWD_RESET, true)
                        navigate('/reset-password')
                    }
                })
            }}
        ]}>
            <p className='text text_type_main-small text_color_inactive'>Вспомнили пароль? <Link to='/login'>Войти</Link></p>
    </Form>)
}