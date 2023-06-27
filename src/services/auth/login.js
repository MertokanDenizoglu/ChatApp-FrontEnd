import Axios from "../api";

export const loginUser = (email, password) => {
  const url = "/auth/login";

  const data = {
    email: email,
    password: password,
  };

  return Axios.post(url, data);
};

export const registerUser = (email, password, username) => {
  const url = "/auth/register";

  const data = {
    email: email,
    password: password,
    username: username,
  };

  return Axios.post(url, data);
};
