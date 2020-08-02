import styled from "styled-components";

export const BaseSection = styled.section`
  text-align: ${props => props.align || "left"};
  padding: var(--scale-3);
  max-width: 1200px;
  margin: 0 auto;
  background: ${props => props.background};

  h1 {
    margin-top: 0;
  }

  @media (min-width: 768px) {
    padding: var(--scale-5) var(--scale-3);
    margin: 0 calc(-1 * var(--scale-3));
  }

  @media (min-width: 1200px) {
    padding: var(--scale-5) var(--scale-3);
    margin: 0 auto;
  }
`;

export const IntroSection = styled(BaseSection)`
  background: var(--color-secondary-l4);
  text-align: left;
  margin: 0 calc(-1 * var(--scale-3));
`;

export const SectionInner = styled.div`
  max-width: var(--scale-md);
  margin: 0 auto;
`;
