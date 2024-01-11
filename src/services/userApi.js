const API_URL = "http://localhost:8000";

export async function getProjects() {
  const res = await fetch(`${API_URL}/project`, {
    credentials: "include",
  });
  console.log(res);
  if (!res.ok) {
    return null;
  }

  const projects = await res.json();
  return projects;
}

export async function getTeams() {
  const res = await fetch(`${API_URL}/team`, {
    credentials: "include",
  });
  console.log(res);
  if (!res.ok) {
    return null;
  }

  const teams = await res.json();
  return teams;
}

export async function getTasks() {
  const res = await fetch(`${API_URL}/task`, {
    credentials: "include",
  });
  console.log(res);
  if (!res.ok) {
    return null;
  }

  const tasks = await res.json();
  return tasks;
}
