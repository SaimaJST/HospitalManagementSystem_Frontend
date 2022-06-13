import { React, useState, useEffect } from "react";
import { useAuthState } from "../../context/AuthContext/index";
import { getAllForPatient } from "../../services/appointmentService";
import { TouchableOpacity, Text } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const optionsPerPage = [2, 3, 4];

const Patient = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const { user } = useAuthState();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, appointmentData.length);

  const navigation = useNavigation();

  useEffect(async () => {
    const res = await getAllForPatient(user.patientid);
    setAppointmentData(res.data);
    console.log(res.data);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      {user.patientid != null && user.patientid != "" ? (
        <>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Serial</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
            </DataTable.Header>
            {appointmentData.length > 0 &&
              appointmentData.map((appointment) => (
                <>
                  <DataTable.Row>
                    <DataTable.Cell>{appointment.doctor}</DataTable.Cell>
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

export default Patient;
