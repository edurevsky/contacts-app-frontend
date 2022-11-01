import "./index.css";

interface Props {
  id: string,
  children: string,
  type?: React.HTMLInputTypeAttribute | undefined,
  value?: string | number | readonly string[] | undefined,
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined,
  placeholder?: string | undefined,
  required?: boolean | undefined
}

const FormInput = (props: Props) => {
  const { id, children, ...rest } = props;
  return (
    <div className="form-input">
      <label htmlFor={id}>{children}</label>
      <input {...rest} />
    </div>
  );
}

export default FormInput;