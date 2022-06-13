import { React, useState, useEffect } from "react";
import { useAuthState } from "../../context/AuthContext/index";
import { getAllForDoctor } from "../../services/appointmentService";
import { TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getDetails } from "../../services/patientService";

const optionsPerPage = [2, 3, 4];

const DocAppointment = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const { user } = useAuthState();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, appointmentData.length);
  const [appointments, setAppointments] = useState([]);

  const navigation = useNavigation();

  useEffect(async () => {
    const res = await getAllForDoctor(user.doctorid);
    console.log(res.data);
    res.data.map(async (appointment) => {
      const res2 = await getDetails(appointment.patient);
      const obj = {};
      console.log("I am In");
      obj["patient"] = res2.data;
      const appmt = [...appointments, obj];
      setAppointments(appmt);
    });
    setAppointmentData(res.data);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  console.log("App-> ", appointments);
  // if (appointments.length > 0) {
  //   const data = getAllAppointments(appointments);
  // }

  return (
    <>
      {user.doctorid != null && user.doctorid != "" ? (
        <>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Patient</DataTable.Title>
              <DataTable.Title>Age</DataTable.Title>
              <DataTable.Title>Assign-Nurse</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
            </DataTable.Header>
            {appointments.length > 0 &&
              appointments.map((appointment) => (
                <>
                  <DataTable.Row>
                    <DataTable.Cell>{appointment.doctor}</DataTable.Cell>
                    <DataTable.Cell>{appointment.date}</DataTable.Cell>
                    <DataTable.Cell>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("TreatmentForm", {
                            treatmentId: appointment._id,
                          });
                        }}
                      >
                        <Text>Goto Treatment</Text>
                      </TouchableOpacity>
                    </DataTable.Cell>
                  </DataTable.Row>
                </>
              ))}
          </DataTable>
        </>
      ) : (
        <>
          <h4>You have no appointment yet.</h4>
        </>
      )}
    </>
  );
};

export default DocAppointment;
