import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import {
  ButtonTypeEnum,
  InputTypeEnum,
  TResponseWithSuccess,
} from "../../utils/types";
import { fetchReset } from "../../services/reducers/profile";
import Form from "../../components/Form/Form";
import { STORAGE_PWD_RESET } from "../../consts";

export default function ResetPwdPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const flagRestored = localStorage.getItem(STORAGE_PWD_RESET);
    if (!flagRestored) {
      navigate("/forgot-password", { replace: true });
    }
  }, []);

  return (
    <Form
      formTitle="Восстановление пароля"
      formName="resetpwd"
      handleSubmit={(formData) => {
        dispatch(fetchReset(formData)).then((res) => {
          localStorage.removeItem(STORAGE_PWD_RESET);
          if (
            "payload" in res &&
            (res.payload as TResponseWithSuccess).success
          ) {
            navigate("/login", { replace: true });
          }
        });
      }}
      formFields={[
        {
          inputType: InputTypeEnum.PWD,
          placeholder: "Введите новый пароль",
          inputName: "password",
        },
        {
          inputType: InputTypeEnum.TEXT,
          placeholder: "Введите код из письма",
          inputName: "token",
        },
      ]}
      buttons={[{ text: "Сохранить", htmlType: ButtonTypeEnum.SUBMIT }]}>
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
