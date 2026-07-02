
export function getSessionToken() {
  let token = localStorage.getItem("sessionToken");

  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem("sessionToken", token);
  }

  return token;
}
