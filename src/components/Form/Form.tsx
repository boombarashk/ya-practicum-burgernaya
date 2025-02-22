import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TFieldProps, TButtonProps, TValues } from "../../utils/types";
import { ProfileSelector } from "../../store";
import { useForm } from "../../hooks/useForm";
import styles from "./Form.module.css";

type TFormProps = {
  formName: string;
  formTitle?: string;
  formFields: TFieldProps[];
  buttons?: TButtonProps[];
  children?: React.ReactNode;
  initialValues?: TValues<string, unknown>;
  handleSubmit: (values: TValues<string, unknown>) => void; //| Promise<unknown>;
};

export default function Form({
  formFields,
  buttons,
  formTitle,
  formName,
  initialValues,
  handleSubmit,
  children,
}: TFormProps): React.JSX.Element {
  const { error: errorMsg } = useSelector(ProfileSelector);

  const { values, handleChange } = useForm(initialValues);

  //customHandleChange dispatch(resetProfileError());

  return (
    <form
      name={formName}
      onSubmit={(ev) => {
        ev.preventDefault();
        handleSubmit(values);
      }}
      className={styles.container}>
      {formTitle && <h1 className={styles.title}>{formTitle}</h1>}

      {formFields.map((field) => {
        const inputValue: string = String(values[field.inputName] ?? "");
        const keyValue = `${formName}-${field.inputName}`;
        const iconProp = field.icon ? { icon: field.icon } : {};

        switch (field.inputType) {
          case "password":
            return (
              <PasswordInput
                key={keyValue}
                onChange={handleChange}
                value={inputValue}
                name={field.inputName}
                placeholder={field.placeholder}
                {...iconProp}
              />
            );
          case "email":
            return (
              <EmailInput
                key={keyValue}
                name={field.inputName}
                placeholder={field.placeholder}
                value={inputValue}
                onChange={handleChange}
                {...iconProp}
              />
            );
          default:
            return (
              <Input
                key={keyValue}
                name={field.inputName}
                placeholder={field.placeholder}
                value={inputValue}
                onChange={handleChange}
                {...iconProp}
              />
            );
        }
      })}

      <div className={styles.buttons}>
        {buttons?.map((button, ind) => {
          return (
            <Button
              key={`${formName}-button-${ind}`}
              htmlType={button.htmlType ?? "button"}
              type={button.isSecondary ? "secondary" : "primary"}
              onClick={(ev) => {
                if (typeof button.handleClick === "function") {
                  button.handleClick(ev);
                }
              }}>
              {button.text}
            </Button>
          );
        })}
      </div>

      {errorMsg && <div className={styles.error}>{errorMsg}</div>}

      <div className={styles.footers}>{children}</div>
    </form>
  );
}
