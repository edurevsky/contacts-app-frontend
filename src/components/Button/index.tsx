import "./button.css";

interface Props {
  children: string,
  isFor?: "add" | "delete" | undefined,
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: () => void
}

const Button = ({ children, isFor, type, onClick }: Props) => {
  const buttonColors = {
    'add': '#00f119',
    'delete': '#f90041'
  }
  return (
    <button
      style={{
        backgroundColor: isFor ? buttonColors[isFor] : '#005eff'
      }}
      className="btn"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;