import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { withPrefix } from "gatsby";
import useSiteMetadata from "./site-meta-data";
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

const Layout = ({ location, title, children, fullWidth }) => {
  const { description } = useSiteMetadata();

  return (
    <Fragment>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />

        <link rel="apple-touch-icon" sizes="180x180" href={`${withPrefix("/")}img/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" href={`${withPrefix("/")}img/favicon-32x32.png`} sizes="32x32" />
        <link rel="icon" type="image/png" href={`${withPrefix("/")}img/favicon-16x16.png`} sizes="16x16" />

        <link rel="mask-icon" href={`${withPrefix("/")}img/safari-pinned-tab.svg`} color="#ff4400" />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content={`${withPrefix("/")}img/og-image.jpg`} />
      </Helmet>
      <Navbar />
      <Main className={fullWidth && "full-width"}>{children}</Main>
    </Fragment>
  );
};

export default Layout;
