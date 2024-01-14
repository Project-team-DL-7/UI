const API_URL = import.meta.env.VITE_BE_URL;

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
    credentials: "include",
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

export async function inviteUserToTeam(id_team, id_user) {
  console.log('Team ID:', id_team);
  console.log('User ID:', id_user);
  try {
    const res = await fetch(`${API_URL}/team/${id_team}/invite/${id_user}`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      let error;
      try {
        if (res.headers.get('Content-Type').includes('application/json')) {
          error = await res.json(); // Try to get error message from server
        } else {
          error = { message: await res.text() }; // Read response as text if not JSON
        }
      } catch {
        error = { message: res.statusText };
      }
      throw new Error(
        `Request failed with status ${res.status}: ${error.message}`
      );
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error); // Log the error
    throw Error("Failed inviting user to team");
  }
}