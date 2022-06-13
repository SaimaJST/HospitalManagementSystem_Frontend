import { React, useState } from "react";
import { Moment } from "react-moment";
import { Button } from "react-native-web";
import moment from "moment";

const DoctorForm = () => {
  return (
    <>
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit} color="gray">
        <label htmlFor="areaOfExpertise">Area of Expertise:</label>
        <input
          name="areaOfExpertise"
          type="text"
          placeholder="Dental"
          //   value={state.name}
          //   onChange={handleChange}
          required
        />
        <button>Confirm</button>
      </form>
    </>
  );
};

export default DoctorForm;

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
