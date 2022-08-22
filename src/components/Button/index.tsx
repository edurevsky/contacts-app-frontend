import "./button.css";

interface Props {
  children: string,
  isFor?: "add" | "delete" | undefined,
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: () => void
}

const Button = ({ children, isFor, type, onClick }: Props) => {
  const buttonColors = {
    'add': '#00ff9a',
    'delete': '#f94100'
  }
  return (
    <button
      style={{
        backgroundColor: isFor ? buttonColors[isFor] : '#007eff',
        fontSize: "11pt"
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