import React from "react";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { deleteTeam, getTeam } from "../../services/teamsApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { HiOutlineTrash } from "react-icons/hi2";
import Row from "../../ui/Row";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-template-rows: 2fr 2fr;
  justify-items: center;
  gap: 3rem;
`;

const StyledTeamsDiv = styled.div`
  border: 2px solid var(--color-grey-100);
  padding: 1rem;
  width: 50vh;
  height: 45vh;
`;

const TrashIcon = styled(HiOutlineTrash)`
  cursor: pointer;
`;

const TeamCard = () => {
  const {
    data: teams,
    isLoading,
    isError,
    error,
  } = useQuery("teams", async () => {
    const teamsId = [3, 4, 5];
    const teamsData = await Promise.all(teamsId.map((id) => getTeam(id)));
    return teamsData;
  });

  const queryClient = useQueryClient();

  const deleteTeamMutation = useMutation(deleteTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries("teams");
    },
  });

  const handleDelete = async (teamId) => {
    try {
      await deleteTeamMutation.mutateAsync(teamId);
      await refetch();
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <StyledDiv>
      {teams.map((team) => (
        <StyledTeamsDiv key={team.id_team}>
          <Row type={"horizontal"}>
            <Heading as={"h2"}>{team.team_name}</Heading>
            <TrashIcon size={25} onClick={() => handleDelete(team.id_team)} />
          </Row>
          <Heading as={"h3"}>{team.description}</Heading>
        </StyledTeamsDiv>
      ))}
    </StyledDiv>
  );
};

export default TeamCard;
