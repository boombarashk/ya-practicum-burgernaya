import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchRestore } from "../../services/reducers/profile";
import Form from "../../components/Form/Form";
import { STORAGE_PWD_RESET } from "../../consts";
import { AppDispatch } from "../../store";
import { ButtonTypeEnum, InputTypeEnum } from "../../utils/types";

export default function RestorePwdPage(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <Form
      formTitle="Восстановление пароля"
      formName="restorepwd"
      handleSubmit={(formData) => {
        dispatch(fetchRestore(formData)).then((res) => {
          if (res.payload?.success) {
            localStorage.setItem(STORAGE_PWD_RESET, String(true));
            navigate("/reset-password");
          }
        });
      }}
      formFields={[
        {
          inputType: InputTypeEnum.EMAIL,
          placeholder: "Укажите e-mail",
          inputName: "email",
        },
      ]}
      buttons={[{ text: "Восстановить", htmlType: ButtonTypeEnum.SUBMIT }]}>
      <p className="text text_type_main-small text_color_inactive">
        Вспомнили пароль?{" "}
        <Link
          to="/login"
          onClick={() => {
            localStorage.removeItem(STORAGE_PWD_RESET);
          }}>
          Войти
        </Link>
      </p>
    </Form>
  );
}
