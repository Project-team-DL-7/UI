import React from "react";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";
import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { createTask } from "../../services/tasksApi";

const Label = styled.label`
  font-weight: 500;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const CreateTaskForm = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation(
    async (newTaskData) => {
      const response = await createTask(newTaskData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
        reset();
      },
    }
  );

  const onSubmit = (data) => {
    createTaskMutation.mutate(data);
    onClose();
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading>Create New Task</Heading>
      <FormRow>
        <Label htmlFor="project_id">Id Project</Label>
        <Input type="text" id="project_id" {...register("project_id")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="name">Task Name</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Task Description</Label>
        <Input type="text" id="description" {...register("description")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="deadline">Deadline</Label>
        <Input type="text" id="deadline" {...register("deadline")} />
      </FormRow>

      <StyledDiv>
        <Button size={"large"}>Create</Button>
      </StyledDiv>
    </Form>
  );
};

export default CreateTaskForm;
