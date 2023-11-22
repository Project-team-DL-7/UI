import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  background-color: var(--color-grey-50);
  padding: 3rem 4.8rem 6.4rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <ContentWrapper>
        <Sidebar />
        <Main>
          <Outlet />
        </Main>
      </ContentWrapper>
    </StyledAppLayout>
  );
}

export default AppLayout;
