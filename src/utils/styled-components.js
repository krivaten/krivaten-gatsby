import styled from "styled-components";
import media from "./media";
import Icon from "../components/icon";

export const PageWrapperSmall = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;

  @media ${media.sm} {
    max-width: var(--scale-xl);
  }
`;

export const PageWrapper = styled(PageWrapperSmall)`
  @media ${media.md} {
    max-width: 992px;
  }
  @media ${media.lg} {
    max-width: 1200px;
  }
`;

export const HorizontalRule = styled.hr`
  margin: 1rem 0;
`;

export const MetaIcon = styled(Icon)`
  width: 1rem;
`;

export const MetaContainer = styled.dl`
  font-style: italic;
  margin: var(--scale-2) 0;
  font-size: 80%;
`;

export const HeaderTitle = styled.h1`
  overflow-wrap: break-word;
`;

export const MetaItemWrapper = styled.div`
  margin: 0.5rem 0;
  display: grid;
  grid-gap: var(--scale-3);
  grid-template-columns: 1rem 1fr;
`;

export const MetaItemWrapperCentered = styled(MetaItemWrapper)`
  justify-content: center;
`;

export const MetaItemTerm = styled.dt`
  width: 1rem;
  display: flex;

  @media ${media.sm} {
    &:nth-of-type(even) {
      grid-row: 1;
      grid-column: 4;
    }
  }
`;

export const MetaItemDetail = styled.dd`
  margin: 0;
  font-size: 80%;

  @media ${media.sm} {
    &:nth-of-type(even) {
      grid-row: 1;
      grid-column: 3;
      text-align: right;
    }
  }
`;

export const MetaItemDetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: inline-block;

  li {
    display: inline-block;
    margin-right: var(--scale-1);
  }

  a {
    display: block;
  }
`;

export const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const PostListItem = styled.li`
  background: var(--color-white-l1);
  box-shadow: var(--shadow-1);
  margin: var(--scale-3) 0;
  padding: var(--scale-3);
  border-radius: var(--scale-1);

  @media screen and ${media.sm} {
    grid-template-columns: 0.45fr 0.55fr;
    display: grid;
    grid-gap: var(--scale-3);
    padding: var(--scale-3);
  }

  &:not(.has-image) > div {
    grid-column: 1 / -1;
  }

  dl,
  p {
    color: var(--color-black);
  }

  img {
    width: 100%;
  }

  h2 {
    margin-top: 0;
  }
`;

export const PostExcerpt = styled.p`
  font-size: 80%;
  line-height: 1.6em;
  grid-column: 1 / -1;
  margin: 0;
`;

export const StandardContainer = styled.section`
  margin: 0 auto;
  max-width: var(--scale-md);
`;
