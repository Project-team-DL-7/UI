import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  text-align: start;
`;

const StyledHeading = styled.h1`
  color: var(--color-indigo-700);
`;

function Header() {
  return (
    <StyledHeader>
      <StyledHeading>Task Manager Pro</StyledHeading>
    </StyledHeader>
  );
}

export default Header;
