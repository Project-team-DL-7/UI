const API_URL = import.meta.env.VITE_BE_URL;

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
