const API_URL = "http://localhost:8000";

export async function createTeam(newTeam) {
  try {
    const res = await fetch(`${API_URL}/team`, {
      method: "POST",
      body: JSON.stringify(newTeam),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) throw Error();
    const team = await res.json();
    return team;
  } catch {
    throw Error("Failed creating your team");
  }
}

export async function deleteTeam(id) {
  const res = await fetch(`${API_URL}/team/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw Error(`Couldn't delete team #${id}`);
  }

  return { success: true, message: `Team #${id} deleted successfully` };
}
