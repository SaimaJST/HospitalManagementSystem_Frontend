import axios from "axios";
import { Config } from "../config/apiConfig";

const url = "https://my-health-care-28.herokuapp.com/appointments";

export async function getAllForPatient(id) {
  const config = Config();
  return await axios.get(`${url}/patient/${id}`, config);
}

export async function getAllForDoctor(id) {
  const config = Config();
  return await axios.get(`${url}/doctor/${id}`, config);
}

export async function getAppointment(id) {
  const config = Config();
  return await axios.get(`${url}/${id}`, config);
}

export async function setAppointment(payload) {
  const config = Config();
  return await axios.post(`${url}/set`, payload, config);
}
