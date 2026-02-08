import api from "./api";

/**
 * Login with email and password.
 * @returns {Promise<{ token, user }>}
 */
export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });
  const data = res.data?.data ?? res.data;
  return { token: data.token, user: data.user };
}

/**
 * Register with name, email, password.
 * @returns {Promise<{ token, user }>}
 */
export async function register(name, email, password) {
  const res = await api.post("/auth/register", { name, email, password });
  const data = res.data?.data ?? res.data;
  return { token: data.token, user: data.user };
}
