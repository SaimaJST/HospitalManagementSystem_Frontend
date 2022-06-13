import React, { useState } from "react";
import axios from "axios";
// import react-native components
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

const Rating = (props) => {
  // Set the default Ratings Selected
  const [defaultRating, setDefaultRating] = useState(3);
  // Set the max number of Ratings
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [text, setText] = useState("");
  const r = { patientid: "62a4a549d4810d382a6043c1", rate: 0, text: "" };
  const data = props.r.d.drid;
  console.log(data);
  const updateValue = (data) => {
    r.rate = data;
    r.text = text;

    console.log(r);
    send(r);
  };

  const send = () => {
    console.log(r);

    axios
      .post(
        `https://my-health-care-28.herokuapp.com/doctors/rate/:${data}`,
        r,
        {
          headers: {
            "x-auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmEzYTcxOGFkNThjZWFmYTJiYzAyNjciLCJkb2N0b3JpZCI6bnVsbCwibnVyc2VpZCI6bnVsbCwicGF0aWVudGlkIjpudWxsLCJhZG1pbmlkIjoiNjJhM2E4MjdhZDU4Y2VhZmEyYmMwMjgyIiwicm9sZXMiOlsiQWRtaW4iXSwiaWF0IjoxNjU0ODk2NTUzfQ.vmbD5t6npzhNdlhJDqTWJFO33BU7WK1TPtR-sGgbbQQ",
            //'x-auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmEzYTcxOGFkNThjZWFmYTJiYzAyNjciLCJkb2N0b3JpZCI6bnVsbCwibnVyc2VpZCI6bnVsbCwicGF0aWVudGlkIjpudWxsLCJhZG1pbmlkIjoiNjJhM2E4MjdhZDU4Y2VhZmEyYmMwMjgyIiwicm9sZXMiOlsiQWRtaW4iXSwiaWF0IjoxNjU0ODk2NTUzfQ.vmbD5t6npzhNdlhJDqTWJFO33BU7WK1TPtR-sGgbbQQ",
          },
        }
      )

      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // Filled Star
  const starImageFilled =
    "https://www.techup.co.in/wp-content/uploads/2020/11/ic_star_fill.png";
  // Empty Star
  const starImageCorner =
    "https://www.techup.co.in/wp-content/uploads/2020/11/ic_star.png";
  // Half Star
  const startHalfFilled =
    "https://www.techup.co.in/wp-content/uploads/2020/11/ic_star_half.png";

  const onStarClick = (item, bool) => {
    if (bool) {
      item = item - 1 + 1;
    }
    setDefaultRating(item);
  };
  const CustomRatingBar = () => {
    return (
      <View style={styles.ratingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <View>
              <Image
                style={styles.imageStyle}
                source={
                  item <= defaultRating
                    ? { uri: starImageFilled }
                    : item >= defaultRating && item < defaultRating + 1
                    ? { uri: startHalfFilled }
                    : { uri: starImageCorner }
                }
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  position: "absolute",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    width: 20,
                    height: 40,
                  }}
                  onPress={() => onStarClick(item, true)}
                />

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    width: 20,
                    height: 40,
                  }}
                  onPress={() => onStarClick(item, false)}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, margin: 10, borderWidth: 1, padding: 15 }}
          placeholder="Leave a comment!"
          onChangeText={(value) => setText(value)}
          defaultValue={r.text}
        />
        {/* Custom Rating Bar component */}
        <CustomRatingBar />
        <Text style={styles.textStyle}>
          {/* Display selected Ratings */}
          {defaultRating} / {Math.max.apply(null, maxRating)}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          //onPress={() => setRate('Selected Ratings ' + defaultRating)}>
          onPress={() => {
            updateValue(defaultRating);
          }}
        >
          {/* Button to display selected Ratings in alert box */}
          <Text style={styles.buttonTextStyle}>Confirm Ratings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Rating;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 23,
    color: "#000",
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
    marginTop: 15,
  },
  buttonStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
    padding: 15,
    backgroundColor: "#080566",
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  ratingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  imageStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
});
