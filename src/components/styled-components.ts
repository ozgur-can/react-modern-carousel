import styled from "styled-components";

export const AnimatedItem = styled.img<{ rotation: string }>`
  ${({ rotation }) =>
    (rotation === ">" &&
      `
    transform: scale(1.1);
    // transform: translate(100px, 0);
    transition: all 400ms ease-out;
  `) ||
    (rotation === "<" &&
      `
  transform: scale(0.3);
  // transform: translate(100px, 0);
  transition: all 400ms ease-out;
`)}
`;
