const API_URL = "http://localhost:8000";

export async function getMe() {
  const res = await fetch(`${API_URL}/me`, {
    credentials: "include",
  });
  console.log(res);
  if (!res.ok) {
    return null;
  }

  const me = await res.json();
  return me;
}
