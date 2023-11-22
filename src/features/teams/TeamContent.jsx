import React from "react";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { deleteTeam, getTeam } from "../../services/teamsApi";
import { useMutation, useQuery, useQueryClient } from "react-query";

const StyledContent = styled.div`
  display: flex;
  gap: 4rem;
  border: 2px solid var(--color-grey-100);
  height: 10vh;
  padding: 10px 0 0 10px;
  margin-top: 1.5rem;
`;

const StyledDescription = styled.p`
  font-size: 1.5rem;
`;

const TeamContent = () => {
  const {
    data: teams,
    isLoading,
    isError,
    error,
  } = useQuery("teams", async () => {
    const teamsId = [3, 4];
    const teamsData = await Promise.all(teamsId.map((id) => getTeam(id)));
    return teamsData;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <Heading as={"h2"}>Teams</Heading>
      {teams.map((team) => (
        <StyledContent>
          <Heading as={"h2"}>{team.team_name}</Heading>
          <StyledDescription>{team.description}</StyledDescription>
        </StyledContent>
      ))}
    </div>
  );
};

export default TeamContent;
