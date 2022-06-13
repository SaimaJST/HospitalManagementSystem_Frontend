import { getDetails } from "../services/patientService";

export function getAllAppointments(arr) {
  let appointments = [];
  console.log("Func ", arr);
  arr &&
    arr.map(async (x) => {
      const res2 = await getDetails(x.patient);
      const obj = {};
      console.log("I am In");
      obj["patient"] = res2.data;
      appointments.push(obj);
    });
  return appointments;
}
