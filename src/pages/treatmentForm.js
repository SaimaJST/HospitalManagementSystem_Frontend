import { React, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getTreatment } from "../services/treatmentService";
import { useAuthState } from "../context/AuthContext";

const TreatmentForm = () => {
  const [state, setState] = useState({
    symptom: "",
    assessment: "",
    prescription: "",
    duration: "",
    weight: "",
    pressureHigh: "",
    pressureLow: "",
    sugarLevel: "",
  });
  const [treatmentDetails, setTreatment] = useState(null);

  const navigation = useNavigation();
  const { user } = useAuthState();

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SoA:: ", state);
  };

  useEffect(async () => {
    const res = await getTreatment(route.params.treatmentId);
    setTreatment(res.data);
    console.log("T-> ", res.data);
  }, []);

  const route = useRoute();
  return (
    <View>
      <form onSubmit={handleSubmit}>
        <label htmlFor="symptom">Sypmtoms:</label>
        <input
          name="symptom"
          type="text"
          placeholder=""
          value={state.symptom}
          onChange={handleChange}
          required
        />
        <label htmlFor="assessment">Assesment:</label>
        <input
          name="assessment"
          type="text"
          placeholder=""
          value={state.assessment}
          onChange={handleChange}
          required
        />
        <label htmlFor=" prescription">Prescription:</label>
        <input
          name="prescription"
          type="text"
          placeholder=""
          value={state.prescription}
          onChange={handleChange}
        />
        <label htmlFor="duration">Duration:</label>
        <input
          name="duration"
          type="text"
          placeholder=""
          value={state.duration}
          onChange={handleChange}
        />
        <label htmlFor="weight">Weight:</label>
        <input
          name="weight"
          type="text"
          placeholder=""
          value={state.weight}
          onChange={handleChange}
        />
        <label htmlFor="pressureHigh">PressureHigh:</label>
        <input
          name="pressureHigh"
          type="text"
          placeholder=""
          value={state.pressureHigh}
          onChange={handleChange}
        />
        <label htmlFor="pressureLow">PressureLow:</label>
        <input
          name="pressureLow"
          type="text"
          placeholder=""
          value={state.pressureLow}
          onChange={handleChange}
        />
        <label htmlFor="sugarLevel">Sugar Level:</label>
        <input
          name="sugarLevel"
          type="text"
          placeholder=""
          value={state.sugarLevel}
          onChange={handleChange}
        />
        {(user.doctorid != null || user.nurseid != null) && (
          <button>Update</button>
        )}
      </form>
    </View>
  );
};

export default TreatmentForm;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "silver",
  },
  buttonsContainer: {
    position: "absolute",
    top: 100,
    padding: 20,
  },
});
