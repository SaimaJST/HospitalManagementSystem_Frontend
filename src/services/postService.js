import axios from "axios";
import { Config } from "../config/apiConfig";

const url = "https://my-health-care-28.herokuapp.com/posts";

export async function getAll() {
  const config = Config();
  return await axios.get(`${url}/feed`, config);
}

export async function postBlood(payload) {
  const config = Config();
  return await axios.post(`${url}/send`, payload, config);
}
