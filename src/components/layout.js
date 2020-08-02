import React, { Fragment } from "react";
import Navbar from "./navbar";
import "./styles.scss";
import styled from "styled-components";

const Main = styled.main`
  padding: 0 var(--scale-3) var(--scale-5);
  max-width: var(--scale-xl);
  margin: 0 auto;

  &.full-width {
    max-width: 100%;
    padding: 0 var(--scale-3);
  }
`;

const Layout = ({ children, fullWidth }) => {
  return (
    <Fragment>
      <Navbar />
      <Main className={fullWidth && "full-width"}>{children}</Main>
    </Fragment>
  );
};

export default Layout;
