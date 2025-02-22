import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavProfile from "../../components/NavProfile/NavProfile";
import { useForm } from "../../hooks/useForm";
import { AppDispatch, ProfileSelector } from "../../store";
import {
  getUserDetails,
  patchUserDetails,
  resetProfile,
} from "../../services/reducers/profile";
import profileStyles from "./UserProfile.module.css";
import { TUser } from "../../utils/types";

export default function UserProfilePage(): React.JSX.Element {
  const { user, isAuthChecked, error } = useSelector(ProfileSelector);
  const [edited, setEdited] = useState(false);

  const defaultValues: Partial<TUser> = { name: user.name, email: user.email, password: "" };

  const { values, setValues, handleChange } = useForm(defaultValues);

  const customHandleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setEdited(true);
    handleChange(ev);
  };

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const handleReset = () => {
      dispatch(resetProfile());
      navigate("/login");
    };
    if (typeof user.name === "undefined" && !isAuthChecked) {
      dispatch(getUserDetails())
        .then((res) => {
          if (!res.payload?.success) {
            handleReset();
          }
        })
        .catch((err) => {
          console.log(err);
          handleReset();
        });
    }
  }, [dispatch, user.name, isAuthChecked, navigate]);

  return (
    <main className={profileStyles.container}>
      <div className={profileStyles.aside}>
        <NavProfile />
      </div>

      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          dispatch(patchUserDetails(values)).then((res) => {
            if (res?.payload.success) {
              setEdited(false);
            }
          });
        }}
        name="profile"
        className={profileStyles.form}>
        <Input
          type="text"
          name={"name"}
          placeholder="Имя"
          value={values.name ?? ""}
          onChange={customHandleChange}
          icon="EditIcon"
          extraClass={profileStyles.input}
        />

        <Input
          name={"email"}
          placeholder={"Логин"}
          value={values.email ?? ""}
          onChange={customHandleChange}
          icon="EditIcon"
          extraClass={profileStyles.input}
        />

        <PasswordInput
          name={"password"}
          value={values.password ?? ""}
          onChange={customHandleChange}
          extraClass={profileStyles.input}
        />

        {edited && (
          <div className={profileStyles.buttons}>
            <Button htmlType="submit" type="primary">
              Сохранить
            </Button>
            <Button
              htmlType={"button"}
              type="secondary"
              onClick={() => {
                setValues(defaultValues);
                setEdited(false);
              }}>
              Отмена
            </Button>
          </div>
        )}

        {error && (
          <div className={profileStyles.error}>Ошибка отправки формы</div>
        )}
      </form>
    </main>
  );
}
