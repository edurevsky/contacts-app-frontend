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

const FormInput = ({ id, children, type, value, placeholder, onChange, required }: Props) => {
  return (
    <div className="form-input">
      <label htmlFor={id}>{children}</label>
      <input 
        type={type} 
        id={id} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default FormInput;