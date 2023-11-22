import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const StyledH = styled.h1`
  color: var(--color-indigo-700);
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <StyledH>Task Manager Pro</StyledH>
    </StyledLogo>
  );
}

export default Logo;
