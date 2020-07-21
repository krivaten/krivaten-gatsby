import React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Icon from "../components/Icon";
import logoIcon from "../img/logo.svg";

const NavContainer = styled.nav`
  width: 100%;
  padding: var(--scale-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-sans-serif);
`;

const LogoLink = styled(Link)`
  border: 0;
  stroke: var(--color-link);
  fill: transparent;
  display: flex;

  &:focus,
  &:hover {
    stroke: transparent;
    fill: var(--color-link-hover);
  }

  &:active {
    stroke: transparent;
    fill: var(--color-link-active);
  }
`;

const LogoWrapper = styled(Icon)`
  width: var(--scale-5);
  height: auto;
  transition: fill var(--tween-1), stroke var(--tween-1);
`;

const LinkList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled(Link)`
  display: inline-block;
  padding: var(--scale-1) 0;
  text-decoration: none;
  text-transform: uppercase;
  border: 0;
  margin-left: var(--scale-3);
  color: var(--color-link);
  font-wight: 300;
  transition: all var(--tween-1);
  &:after {
    content: "";
    border-top: 1px solid var(--color-link-hover);
    display: block;
    margin: 0 auto;
    width: 0%;
    transition: width var(--tween-1);
  }

  &.active,
  &:focus,
  &:hover {
    color: var(--color-link-hover);
  }

  &.active,
  &:focus,
  &:hover,
  &[aria-current] {
    &:after {
      width: 80%;
    }
  }

  &:hover:active {
    color: var(--color-link-active);
  }
`;

const Navbar = class extends React.Component {
  render() {
    return (
      <NavContainer>
        <LogoLink exact="true" to="/" title="Krivaten">
          <LogoWrapper iconid={logoIcon.id} viewBox="0 0 303 265" />
        </LogoLink>
        <LinkList>
          <li>
            <LinkItem to="/" exact="true" aria-label="Visit blog page">
              Blog
            </LinkItem>
          </li>
          <li>
            <LinkItem to="/about" aria-label="Visit about page">
              About
            </LinkItem>
          </li>
          <li>
            <LinkItem to="/now" aria-label="Visit now page">
              Now
            </LinkItem>
          </li>
        </LinkList>
      </NavContainer>
    );
  }
};

export default Navbar;
