import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { ButtonTypeEnum, InputTypeEnum } from "../../utils/types";
import { fetchRegister } from "../../services/reducers/profile";
import Form from "../../components/Form/Form";

export default function RegisterPage(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Form
      formName="register"
      handleSubmit={(formData) => {
        dispatch(fetchRegister(formData));
      }}
      formTitle="Регистрация"
      formFields={[
        {
          inputType: InputTypeEnum.TEXT,
          placeholder: "Имя",
          inputName: "name",
        },
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
      buttons={[
        { text: "Зарегистрироваться", htmlType: ButtonTypeEnum.SUBMIT },
      ]}>
      <p className="text text_type_main-small text_color_inactive">
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </Form>
  );
}
