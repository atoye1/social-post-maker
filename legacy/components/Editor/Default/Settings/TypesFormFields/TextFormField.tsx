import { FieldProps } from "../../../../Settings/TypesFormFields/TypeFormField";
import styles from "./TextFormField.module.scss";

export default function TextFormField(props: FieldProps) {
  const { id = "", name = "", value = "", handleOnChange } = props;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    handleOnChange(id, e.currentTarget.value);
  };

  return (
    <div className={styles.field}>
      <label htmlFor={id}>{name}</label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
