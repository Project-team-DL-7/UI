import React from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { createProject } from "../../services/projectsApi";

const Label = styled.label`
  font-weight: 500;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const CreateProjectForm = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation(
    async (newProjectData) => {
      const response = await createProject(newProjectData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("projects");
        reset();
      },
    }
  );

  const onSubmit = (data) => {
    createProjectMutation.mutate(data);
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading>Create New Project</Heading>
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

export default CreateProjectForm;
