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
        id_team: Number(updatedTeam.id_team), // Convert id_team to a number
        description: updatedTeam.description,
        team_name: updatedTeam.team_name
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    if (!res.ok) throw Error();
    const team = await res.json();
    return team;
  } catch {
    throw Error("Failed updating your team");
  }
}