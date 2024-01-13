const API_URL = "http://localhost:8000";

export async function createTask(task) {
  const response = await fetch(`${API_URL}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/task/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return response.json();
}

export async function updateTask({ id_task, id_project, id_user, task_name, description, deadline, status }) {
  const response = await fetch(`${API_URL}/task`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id_task, id_project, id_user, task_name, description, deadline, status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
}