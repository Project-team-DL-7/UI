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

export async function updateTeam(updatedTeam) {
  try {
    const res = await fetch(`${API_URL}/team`, {
      method: "PUT",
      body: JSON.stringify({
        id_team: Number(updatedTeam.id_team),
        description: updatedTeam.description,
        team_name: updatedTeam.team_name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json(); // Try to get error message from server
      throw new Error(
        `Request failed with status ${res.status}: ${error.message}`
      );
    }
    const team = await res.json();
    return team;
  } catch (error) {
    console.error(error); // Log the error
    throw Error("Failed updating your team");
  }
}
