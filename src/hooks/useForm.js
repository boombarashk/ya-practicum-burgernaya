import { useState } from "react";

export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (ev) => {
    const { value, name } = ev.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
