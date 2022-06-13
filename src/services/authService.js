import axios from "axios";

const url = "https://my-health-care-28.herokuapp.com";

const getConfig = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return config;
};

export async function signup(payload) {
  const config = getConfig();
  return await axios.post(`${url}/auth/register`, payload, config);
}

export async function login(payload) {
  const config = getConfig();
  return await axios.post(`${url}/auth/login`, payload, config);
}
