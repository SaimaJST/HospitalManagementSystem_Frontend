export const Config = () => {
  let token = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser")).auth_token
    : "";

  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": `${token}`,
    },
  };
  return config;
};
