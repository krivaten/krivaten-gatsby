import React from "react";

import Icon from "./icon";
import styled from "styled-components";
import media from "../utils/media";
import vueIcon from "../img/icons/vue.svg";
import reactIcon from "../img/icons/react.svg";
import emberIcon from "../img/icons/ember.svg";
import a11yIcon from "../img/icons/a11y.svg";
import sassIcon from "../img/icons/sass.svg";
import webpackIcon from "../img/icons/webpack.svg";
import graphqlIcon from "../img/icons/graphql.svg";
import nodeIcon from "../img/icons/node.svg";
import htmlIcon from "../img/icons/html.svg";
import cssIcon from "../img/icons/css.svg";
import javascriptIcon from "../img/icons/javascript.svg";
import typescriptIcon from "../img/icons/typescript.svg";
import postgresIcon from "../img/icons/postgres.svg";
import mongoIcon from "../img/icons/mongo.svg";

const things = [
  { icon: vueIcon, label: "Vue JS" },
  { icon: reactIcon, label: "React JS" },
  { icon: emberIcon, label: "Ember JS" },
  { icon: a11yIcon, label: "Accessibility" },
  { icon: sassIcon, label: "SASS" },
  { icon: webpackIcon, label: "Webpack" },
  { icon: graphqlIcon, label: "Graph QL" },
  { icon: nodeIcon, label: "Node JS" },
  { icon: htmlIcon, label: "HTML" },
  { icon: cssIcon, label: "CSS" },
  { icon: javascriptIcon, label: "JavaScript" },
  { icon: typescriptIcon, label: "TypeScript" },
  { icon: postgresIcon, label: "Postgres" },
  { icon: mongoIcon, label: "Mongo DB" }
];

const IconContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: var(--scale-5) 0 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: var(--scale-5);
  row-gap: var(--scale-5);
  max-width: var(--scale-xl);
  margin: 0 auto;

  @media ${media.sm} {
    grid-template-columns: repeat(4, 1fr);
    margin: var(--scale-5) auto;

    li:nth-last-child(2) {
      grid-column: 2 / 2;
    }
    li:nth-last-child(1) {
      grid-column: 3 / 3;
    }
  }
`;

const IconList = () => (
  <IconContainer>
    {things.map(item => (
      <li key={item.label}>
        <Icon iconid={item.icon.id} viewBox="0 0 400 400" />
      </li>
    ))}
  </IconContainer>
);

export default IconList;
