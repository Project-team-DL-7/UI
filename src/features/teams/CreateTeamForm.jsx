import React from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { createTeam } from "../../services/teamsApi";

const Label = styled.label`
  font-weight: 500;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const CreateTeamForm = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const createTeamMutation = useMutation(
    async (newTeamData) => {
      const response = await createTeam(newTeamData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("team");
        reset();
      },
    }
  );

  const onSubmit = (data) => {
    createTeamMutation.mutate(data);
    onClose();
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading>Create New Team</Heading>
      <FormRow>
        <Label htmlFor="team_name">Team Name</Label>
        <Input type="text" id="team_name" {...register("team_name")} />
      </FormRow>
      <FormRow>
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" {...register("description")} />
      </FormRow>

      <StyledDiv>
        <Button size={"large"} type="submit">
          Create
        </Button>
      </StyledDiv>
    </Form>
  );
};

export default CreateTeamForm;
