import api from "./api";

/**
 * Login with email and password.
 * @returns {Promise<{ token, user }>}
 */
export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data.data;
};

export const googleLogin = async (idToken) => {
  const { data } = await api.post("/auth/google", { token: idToken });
  return data.data;
};

/**
 * Register with name, email, password.
 * @returns {Promise<{ token, user }>}
 */
export async function register(name, email, password) {
  const res = await api.post("/auth/register", { name, email, password });
  const data = res.data?.data ?? res.data;
  return { token: data.token, user: data.user };
}

export const sendResetOTP = async (email) => {
  const { data } = await api.post("/auth/forgot-password-otp", { email });
  return data;
};

export const resetPassword = async (email, otp, newPassword) => {
  const { data } = await api.post("/auth/reset-password", { email, otp, newPassword });
  return data;
};
