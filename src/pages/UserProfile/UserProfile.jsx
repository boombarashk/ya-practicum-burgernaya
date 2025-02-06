import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form/Form";
import NavProfile from "../../components/NavProfile/NavProfile";
import collectFormValues from "../../utils/collectFormValues";
import { ProfileSelector, getUserDetails, patchUserDetails, resetProfile } from "../../services/reducers/profile";
import profileStyles from './UserProfile.module.css'

const PROFILE_FORM_NAME = 'profile'

export default function UserProfilePage() {
    const { user, isAuthChecked } = useSelector(ProfileSelector)
    const [ edited, setEdited ] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
    const handleReset = () => {
        dispatch(resetProfile())
        navigate('/login')
    }
            if (typeof user.name === 'undefined' && !isAuthChecked) {
                dispatch(getUserDetails()).then(res => {
                    if (!res.payload?.success) {
                        handleReset()
                    }
                }).catch((err) =>{
                    console.log(err)
                    handleReset()
                })
            }
        }, [dispatch, user.name, isAuthChecked, navigate])
        
    const defaultValues = [user.name, user.email, '']
    const fields = [
        {inputType: 'text', placeholder: 'Имя', inputName: 'name', value: defaultValues[0], icon: "EditIcon"},
        {inputType: 'email', placeholder: 'Логин', inputName: 'email', value: defaultValues[1], icon: "EditIcon"},
        {inputType: 'password', placeholder: 'Пароль', inputName: 'password', value: defaultValues[2]}
    ];

    return (<Form formName={PROFILE_FORM_NAME}
        setEdited={setEdited}
        formClassName={profileStyles.container}
        fields={fields}
        initialValues={collectFormValues(fields)}
        buttons={edited ? [
            {text: 'Сохранить', htmlType: 'submit', handleClick: (formData) => {
                dispatch(patchUserDetails(formData)).then((res) =>{
                    if (res?.payload.success){
                        setEdited(false)
                    }
                })
            }},
            {text: 'Отмена', handleClick: () => {/*
                fields.forEach((field, ind) => {
                    document.forms[PROFILE_FORM_NAME][field.inputName].value = defaultValues[ind];
                    fields[ind].value = defaultValues[ind];
                })*/
               navigate(0)
                //setEdited(false)
            }, isSecondary: true}
        ] : null}
        >
        <aside className={profileStyles.aside}>
            <NavProfile/>
        </aside>
    </Form>)
}