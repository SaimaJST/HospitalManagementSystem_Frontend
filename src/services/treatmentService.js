import axios from "axios";
import { Config } from "../config/apiConfig";

const url = "https://my-health-care-28.herokuapp.com/treatments";

export async function getTreatment(id) {
  const config = Config();
  return await axios.get(`${url}/${id}`, config);
}
