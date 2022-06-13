import axios from "axios";
import { Config } from "../config/apiConfig";

const url = "https://my-health-care-28.herokuapp.com/patients";

export async function getDetails(id) {
  const config = Config();
  return await axios.get(`${url}/${id}`, config);
}

export async function getPlotData(id) {
  const config = Config();
  return await axios.get(`${url}/plotdata/${id}`, config);
}
