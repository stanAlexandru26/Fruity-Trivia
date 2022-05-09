import React from "react";

export default function Header({ children, ...rest }) {
  return <h2 {...rest}>{children}</h2>;
}
