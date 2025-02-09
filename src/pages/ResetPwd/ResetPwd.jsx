import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchReset } from "../../services/reducers/profile";
import Form from "../../components/Form/Form";
import { STORAGE_PWD_RESET } from "../../consts";

export default function ResetPwdPage() {
  const dispatch = useDispatch();
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

          if (res?.payload.success) {
            navigate("/login", { replace: true });
          }
        });
      }}
      formFields={[
        {
          inputType: "password",
          placeholder: "Введите новый пароль",
          inputName: "password",
        },
        {
          inputType: "text",
          placeholder: "Введите код из письма",
          inputName: "token",
        },
      ]}
      buttons={[{ text: "Сохранить", htmlType: "submit" }]}>
      <p className="text text_type_main-small text_color_inactive">
        Вспомнили пароль? <Link to="/login" onClick={() => {
          localStorage.removeItem(STORAGE_PWD_RESET)
        }}>Войти</Link>
      </p>
    </Form>
  );
}
