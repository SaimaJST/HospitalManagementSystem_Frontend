import axios from "axios";
import { Config } from "../config/apiConfig";

const url = "https://my-health-care-28.herokuapp.com/doctors";

export async function searchByName(name) {
  const config = Config();
  return await axios.post(`${url}/search`, { name: name }, config);
}

export async function getById(id) {
  const config = Config();
  return await axios.get(`${url}/${id}`, config);
}
