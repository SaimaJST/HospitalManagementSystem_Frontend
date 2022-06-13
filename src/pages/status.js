import { React, useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { getDetails, getPlotData } from "../services/patientService";
import { useAuthState } from "../context/AuthContext";

const Status = () => {
  const [data, setData] = useState([]);
  const [plotData, setPlotData] = useState([]);

  const userDetails = useAuthState();

  useEffect(async () => {
    const res = await getDetails(userDetails.user.patientid);
    console.log(res);
    setData(res.data);
    const res2 = await getPlotData(userDetails.user.patientid);
    setPlotData(res2.data);
    console.log(res2.data);
  }, []);

  return (
    <>
      <View>
        <Text> Name: </Text>
        <Text> Age: </Text>
        <Text> Gender: </Text>
        <Text>Current Information:</Text>
        <Text> Weight: </Text>
        <Text> PressureHigh: </Text>
        <Text> PressureLow: </Text>
        <Text> Sugar Level: </Text>
        <label>
          View Plot for:
          <select>
            <option value="weight">Weight</option>
            <option value="sugarLevel">SugarLevel</option>
          </select>
        </label>
      </View>
    </>
  );
};

export default Status;
