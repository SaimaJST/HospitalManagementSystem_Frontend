import React, { useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "react-native-vector-icons";
import { getAll } from "../../services/postService";
import { useAuthState } from "../../context/AuthContext/index";
import { searchByName } from "../../services/doctorService";

const DocDashboard = () => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);

  const navigation = useNavigation();
  const userDetails = useAuthState();

  useEffect(async () => {
    const res = await getAll();
    console.log(res);
    setPosts(res.data);
  }, []);

  const handleChange = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);
    if (value != "") {
      const res = await searchByName(value);
      setData(res.data);
    } else {
      setData([]);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.name}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    navigation.navigate("Appointment", {
      doctorid: item._id,
      doctorName: item.name,
    });
  };
  //const [searchQuery, setSearchQuery] = React.useState("");

  //const onChangeSearch = (query) => setSearchQuery(query);
  const onChangeSearch = (text) => searchFilterFunction(text);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconcontainer}
          onPress={() => navigation.navigate("DocProfile")}
        >
          <FontAwesome name={"user"} size={40} color={"gray"} />
        </TouchableOpacity>

        <Searchbar
          round
          searchIcon={{ size: 12 }}
          onChange={handleChange}
          onClear={() => setData([])}
          placeholder="Search Here..."
          value={search}
        />
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconcontainer}
          onPress={() => navigation.navigate("DocAppointment")}
        >
          <FontAwesome name={"table"} size={40} color={"skyblue"} />
          <Text>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconcontainer}>
          <FontAwesome name={"group"} size={40} color={"skyblue"} />
          <Text>My Patients</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.iconcontainer}
          onPress={() => navigation.navigate("Home")}
        >
          <FontAwesome name={"repeat"} size={40} color={"gray"} />
          <Text style={styles.text}>Switch</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.post}>
          <Text onPress={() => navigation.navigate("PostBlood")}>
            Emergency Blood Donation Post
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {posts.length > 0 &&
          posts.map((post) => (
            <>
              <View style={styles.textView}>
                <Text> Blood Type: {post.bloodtype}</Text>
                <Text> {post.text}</Text>
                <Text> Contact: {post.contact}</Text>
              </View>
            </>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DocDashboard;

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
  },

  text: {
    justifyContent: "center",
  },

  iconcontainer: {
    marginRight: 20,
    marginTop: 40,
    marginBottom: 40,
    flexDirection: "column",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  touchable: {
    width: "45%",
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    marginRight: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: "cornflowerblue",
  },

  post: {
    width: "50%",
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    marginRight: 25,
    marginRight: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: "cornflowerblue",
  },

  textView: {
    width: "100%",
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
  },
});
