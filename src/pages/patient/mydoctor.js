import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
//import Doctor from  './components/doctors/Doctor';
import DatePicker from "react-native-neat-date-picker";

import axios from "axios";

export default function Appointment(props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  let upDate = {};

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
  const appointment = { doctorid: props.d.drid, date: "" };

  const updatevalue = (data) => {
    console.log(data);
    appointment.date = data;
    console.log(appointment);
    send(appointment);
  };

  const send = (a) => {
    console.log("a", a);
    const b = new Date(a.date);
    console.log("b", b);
    axios
      .post("https://my-health-care-28.herokuapp.com/appointments/set", a, {
        headers: {
          "x-auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmEzYTcxOGFkNThjZWFmYTJiYzAyNjciLCJkb2N0b3JpZCI6bnVsbCwibnVyc2VpZCI6bnVsbCwicGF0aWVudGlkIjpudWxsLCJhZG1pbmlkIjoiNjJhM2E4MjdhZDU4Y2VhZmEyYmMwMjgyIiwicm9sZXMiOlsiQWRtaW4iXSwiaWF0IjoxNjU0ODk2NTUzfQ.vmbD5t6npzhNdlhJDqTWJFO33BU7WK1TPtR-sGgbbQQ",
          //'x-auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmEzYTcxOGFkNThjZWFmYTJiYzAyNjciLCJkb2N0b3JpZCI6bnVsbCwibnVyc2VpZCI6bnVsbCwicGF0aWVudGlkIjpudWxsLCJhZG1pbmlkIjoiNjJhM2E4MjdhZDU4Y2VhZmEyYmMwMjgyIiwicm9sZXMiOlsiQWRtaW4iXSwiaWF0IjoxNjU0ODk2NTUzfQ.vmbD5t6npzhNdlhJDqTWJFO33BU7WK1TPtR-sGgbbQQ",
        },
      })

      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View>
      <View style={styles.h1}>
        <h1>{props.d.drname}</h1>
      </View>
      <View style={styles.h2}>
        <h2>{props.d.area}</h2>
      </View>
      <View style={styles.h2}>
        <h2>{props.d.time}</h2>
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
