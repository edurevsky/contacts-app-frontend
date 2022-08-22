import { ReactNode } from "react";
import "./index.css";

interface Props {
  isModal: boolean
  hasTitle?: string,
  children?: ReactNode,
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
}

const Form = ({ isModal, hasTitle, children, onSubmit }: Props) => {
  return (
    <form 
      className={isModal ? "app-form-modal" : "app-form"}
      onSubmit={onSubmit}
    >
      <div className="form-title">
        <h2>{hasTitle}</h2>    
      </div>
      {children}
    </form>
  );
}

export default Form;