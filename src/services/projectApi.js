const API_URL = "http://localhost:8000";

export async function createProject(newProject) {
  try {
    const res = await fetch(`${API_URL}/project`, {
      method: "POST",
      body: JSON.stringify(newProject),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) throw Error();
    const project = await res.json();
    return project;
  } catch {
    throw Error("Failed creating your project");
  }
}

export async function deleteProject(id) {
  const res = await fetch(`${API_URL}/project/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw Error(`Couldn't delete project #${id}`);
  }

  return { success: true, message: `Project #${id} deleted successfully` };
}
