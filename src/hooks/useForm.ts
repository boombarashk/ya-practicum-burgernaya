import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { TValues } from "../utils/types";

export function useForm<V>(initialValues: TValues<string, V> = {}): {
  values: TValues<string, V>;
  handleChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  setValues: Dispatch<SetStateAction<TValues<string, V>>>;
} {
  const [values, setValues] = useState(initialValues);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = ev.target;
    setValues({ ...values, [name]: value as V });
  };
  return { values, handleChange, setValues };
}
