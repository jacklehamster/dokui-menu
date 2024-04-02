import styled, { keyframes, css } from "styled-components";

const pulse = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`

const animation = () =>
  css`
    ${pulse} .5s infinite alternate;
  `;

export const Blink = styled.span`
  animation: ${animation};
  text-decoration: underline;
`;
