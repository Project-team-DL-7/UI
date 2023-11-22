import React from "react";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTask, deleteTask } from "../../services/tasksApi";
import { HiOutlineTrash } from "react-icons/hi2";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledBody = styled.div`
  margin: 0.4rem 0;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TrashIcon = styled(HiOutlineTrash)`
  cursor: pointer;
`;

const TaskTable = () => {
  const {
    isLoading,
    isError,
    data: tasks,
    refetch,
  } = useQuery("tasks", async () => {
    const tasksIds = [18, 17, 16, 14];
    const tasksData = await Promise.all(tasksIds.map((id) => getTask(id)));
    return tasksData;
  });

  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const handleDelete = async (taskId) => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
      await refetch();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching tasks</p>;

  return (
    <StyledTable>
      <StyledHeader columns="auto 1fr 2fr 1fr 1fr">
        <div>ID</div>
        <div>Name</div>
        <div>Description</div>
        <div>Deadline</div>
        <div>Delete</div>
      </StyledHeader>
      <StyledBody>
        {tasks.map((task) => (
          <StyledRow columns="auto 1fr 2fr 1fr 1fr" key={task.id_task}>
            <div>{task.id_task}</div>
            <div>{task.task_name}</div>
            <div>{task.description}</div>
            <div>{task.deadline}</div>
            <div>
              <TrashIcon size={15} onClick={() => handleDelete(task.id_task)} />
            </div>
          </StyledRow>
        ))}
        {tasks.length === 0 && <Empty>No tasks available.</Empty>}
      </StyledBody>
    </StyledTable>
  );
};

export default TaskTable;
