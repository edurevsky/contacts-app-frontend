import { CSSProperties, ReactNode } from "react";
import "./index.css";

interface Props {
  children: ReactNode,
  style?: CSSProperties
}

const Container = ({ children, style }: Props) => {
  return (
    <div
      className="container"
      style={{ ...style }}
    >
      {children}
    </div>
  );
}

export default Container;