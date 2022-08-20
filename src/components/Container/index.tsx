import { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode,
  style?: CSSProperties
}

const Container = ({ children, style }: Props) => {
  return (
    <div
      style={{
        maxWidth: "1440px",
        padding: "0 5px",
        margin: "auto",
        ...style
      }}
    >
      {children}
    </div>
  )
}

export default Container;