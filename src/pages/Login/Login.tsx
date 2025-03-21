import React from "react";
import { Link } from "react-router-dom";
import { fetchLogin } from "../../services/reducers/profile";
import Form from "../../components/Form/Form";
import { ButtonTypeEnum, InputTypeEnum } from "../../utils/types";
import { useAppDispatch } from "../../store";

export default function LoginPage(): React.JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <Form
      formName="login"
      handleSubmit={(formData) => {
        dispatch(fetchLogin(formData));
      }}
      formTitle="Вход"
      formFields={[
        {
          inputType: InputTypeEnum.EMAIL,
          placeholder: "E-mail",
          inputName: "email",
        },
        {
          inputType: InputTypeEnum.PWD,
          placeholder: "Пароль",
          inputName: "password",
        },
      ]}
      buttons={[{ text: "Войти", htmlType: ButtonTypeEnum.SUBMIT }]}>
      <p className="text text_type_main-small text_color_inactive">
        Вы &mdash; новый пользователь?{" "}
        <Link to="/register">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-small text_color_inactive">
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </Form>
  );
}
