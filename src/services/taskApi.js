const API_URL = "http://localhost:2000";

export async function getTask(id) {
  const res = await fetch(`${API_URL}/task/${id}`);
  if (!res.ok) throw Error(`Couldn't find task #${id}`);

  const task = await res.json();
  return task;
}

export async function createTask(newTask) {
  try {
    const res = await fetch(`${API_URL}/task`, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const task = await res.json();
    return task;
  } catch {
    throw Error("Failed creating your task");
  }
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/task/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw Error(`Couldn't delete task #${id}`);
  }

  return { success: true, message: `Task #${id} deleted successfully` };
}
