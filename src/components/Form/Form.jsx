import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { formPropType } from '../../utils/types'
import Modal from '../Modal/Modal'
import { ProfileSelector, resetProfileError } from '../../services/reducers/profile'
import styles from './Form.module.css'

Form.propTypes = formPropType

export default function Form({children, fields, buttons, title, formName, initialValues = {}, formClassName, setEdited}) {
    const dispatch = useDispatch()
    const { error: errorMsg } = useSelector(ProfileSelector)

    const [values, setValues] = useState(initialValues)

    const [showModal, setShowModal] = useState(false)
    const handleModalClose = () => {
        setShowModal(false)
        dispatch(resetProfileError())
    }
    useEffect(() => {
        if (errorMsg) {
            setShowModal(true)
        }
    }, [errorMsg])

    const handleChange = (ev, inputName) => {
        setValues({...values, [inputName]: ev.target.value})
        if (typeof setEdited === 'function'){
            setEdited(true)
        }
    }

    return (<><form name={formName}
        className={`${styles.container} ${formClassName ?? ''}`}>
        {title && (<h1 className={styles.title}>{title}</h1>)}

        {fields.map(field => {
            const defaultValue = values[field.inputName] ?? '';
            const keyValue = `${formName}-${field.inputName}`;
            const iconProp = field.icon ? {icon: field.icon} : {};

            switch (field.inputType) {
                case "password": return (<PasswordInput key={keyValue}
                onChange={(ev) => handleChange(ev, field.inputName)}
                value={defaultValue}
                name={field.inputName}
                {...iconProp}
              />);
              case "email": return (<EmailInput key={keyValue}
                name={field.inputName}
                placeholder={field.placeholder}
                value={defaultValue}
                onChange={(ev) => handleChange(ev, field.inputName)}
                {...iconProp}
                />)
              default: return (<Input key={keyValue}
                name={field.inputName}
                placeholder={field.placeholder}
                value={defaultValue}
                onChange={(ev) => handleChange(ev, field.inputName)}
                {...iconProp}
                />)                
            }
        })}

        <div className={styles.buttons}>
        {buttons?.map((button, ind) => {
            return <Button key={`${formName}-button-${ind}`}
                htmlType={button.htmlType ?? 'button'}
                type={button.isSecondary ? "secondary" : "primary"}
                onClick={(ev) => {
                    ev.preventDefault()
                    button.handleClick(values)
                    }}>
                    {button.text}
            </Button>
        })}
        </div>

        <div className={styles.footers}>{children}</div>
    </form>

    {showModal && (<Modal onHandleClose={handleModalClose}>
        <p className='text text_type_main-large'>{errorMsg}</p>
    </Modal>)}
    </>)
}