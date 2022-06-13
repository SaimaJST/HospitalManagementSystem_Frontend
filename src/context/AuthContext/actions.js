import { login, signup } from "../../services/authService";

export async function signupUser(dispatch, payload) {
  dispatch({ type: "REQUEST_SIGNUP" });
  let data = null;
  await signup(payload)
    .then((res) => {
      console.log("SoA:: ", res.data);
      if (res.status == 200) {
        data = {
          user: {
            id: res.data._id,
            username: res.data.name,
            email: res.data.email,
            doctorid: res.data.doctorid,
            nurseid: res.data.nurseid,
            patientid: res.data.patientid,
          },
          auth_token: res.headers["x-auth-token"],
        };
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        localStorage.setItem("currentUser", JSON.stringify(data));
      } else {
        dispatch({ type: "SIGNUP_ERROR", error: res.data.errors[0] });
        return;
      }
    })
    .catch((err) => {
      console.log("Error: ", err.response);
      dispatch({ type: "SIGNUP_ERROR", error: err.response.data.errors[0] });
      return;
    });

  return data;
}

export async function loginUser(dispatch, payload) {
  dispatch({ type: "REQUEST_LOGIN" });
  let data = null;
  console.log("Login->> ", payload);
  await login(payload)
    .then((res) => {
      console.log("MAGLOG:: login->> ", res);
      if (res.status == 200) {
        data = {
          user: {
            id: res.data._id,
            username: res.data.name,
            email: res.data.email,
            doctorid: res.data.doctorid,
            nurseid: res.data.nurseid,
            patientid: res.data.patientid,
          },
          auth_token: res.headers["x-auth-token"],
        };
        console.log(data);
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        localStorage.setItem("currentUser", JSON.stringify(data));
      } else {
        dispatch({ type: "LOGIN_ERROR", error: res.data.errors[0] });
        return;
      }
    })
    .catch((err) => {
      console.log("Error: ", err.response);
      dispatch({ type: "LOGIN_ERROR", error: err.response.data.errors[0] });
      return;
    });

  return data;
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
