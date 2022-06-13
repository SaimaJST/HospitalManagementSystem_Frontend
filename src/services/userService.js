import axios from "axios";
import { Config } from "../config/apiConfig";

const url = "https://my-health-care-28.herokuapp.com/users";

export async function getUser(id) {
  const config = Config();
  return await axios.get(`${url}/${id}`, config);
}

export async function updateUser(id, payload) {
  const config = Config();
  return await axios.post(`${url}/edituser/${id}`, payload, config);
}
