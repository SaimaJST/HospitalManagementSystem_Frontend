import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
//import Doctor from  './components/doctors/Doctor';
import DatePicker from "react-native-neat-date-picker";
import { useRoute } from "@react-navigation/native";
import { setAppointment } from "../../services/appointmentService";
import { getById } from "../../services/doctorService";

import axios from "axios";

export default function Appointment(props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [doctorDetails, setDetails] = useState({});

  let upDate = {};
  const route = useRoute();

  useEffect(async () => {
    const res = await getById(route.params.doctorid);
    setDetails(res.data);
    console.log(res.data);
  }, []);

  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const onCancel = () => {
    setShowDatePicker(false);
  };

  const onConfirm = (date) => {
    setShowDatePicker(false);
    setSelectedDate(date.dateString);
    updatevalue(date.dateString);
  };
  const appointment = { doctorid: route.params.doctorid, date: "" };

  const updatevalue = (data) => {
    console.log(data);
    appointment.date = data;
    console.log(appointment);
    send(appointment);
  };

  const send = async (a) => {
    console.log("a", a);
    const b = new Date(a.date);
    console.log("b", b);
    const res = await setAppointment(a);
    console.log(res);
  };

  return (
    <View>
      <View style={styles.h1}>
        <h1>{route.params.doctorName}</h1>
      </View>
      <View style={styles.button}>
        <Button title={"Take Appointment"} onPress={openDatePicker} />
      </View>
      <DatePicker
        isVisible={showDatePicker}
        mode={"single"}
        onCancel={onCancel}
        onConfirm={onConfirm}
        // onDateChange={onConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "lightgray",
  },
  h2: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "lightgray",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
