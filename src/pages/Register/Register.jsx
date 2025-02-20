import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../../services/reducers/profile";
import Form from "../../components/Form/Form";

export default function RegisterPage() {
  const dispatch = useDispatch();

  return (
    <Form
      formName="register"
      handleSubmit={(formData) => {
        dispatch(fetchRegister(formData));
      }}
      formTitle="Регистрация"
      formFields={[
        { inputType: "text", placeholder: "Имя", inputName: "name" },
        { inputType: "email", placeholder: "E-mail", inputName: "email" },
        { inputType: "password", placeholder: "Пароль", inputName: "password" },
      ]}
      buttons={[{ text: "Зарегистрироваться", htmlType: "submit" }]}>
      <p className="text text_type_main-small text_color_inactive">
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </Form>
  );
}
