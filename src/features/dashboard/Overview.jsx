import React from "react";
import styled from "styled-components";
import TeamContent from "../teams/TeamContent";
import TaskContent from "../tasks/TaskContent";
import ProjectContent from "../projects/ProjectContent";

const OverviewLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

const StyledProject = styled.div`
  grid-column-start: 1;
  grid-column-end: -1;
  height: 30vh;
  border: 2px solid var(--color-grey-100);
  padding: 1rem;
`;

const StyledTask = styled.div`
  border: 2px solid var(--color-grey-100);
  padding: 1rem;
  height: 35vh;
`;

const StyledTeam = styled.div`
  border: 2px solid var(--color-grey-100);
  padding: 1rem;
  height: 35vh;
`;

const Overview = () => {
  return (
    <OverviewLayout>
      <StyledProject>
        <ProjectContent />
      </StyledProject>
      <StyledTask>
        <TaskContent />
      </StyledTask>
      <StyledTeam>
        <TeamContent />
      </StyledTeam>
    </OverviewLayout>
  );
};

export default Overview;
