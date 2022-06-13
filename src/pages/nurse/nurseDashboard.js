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

const NurseDashboard = () => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);

  const navigation = useNavigation();
  const userDetails = useAuthState();

  useEffect(async () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });

    const res = await getAll();
    console.log(res);
    setPosts(res.data);
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    setData([]);
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
      setData(filteredDataSource);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
      setData([]);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {"."}
        {item.title.toUpperCase()}
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
    alert("Id : " + item.id + " Title : " + item.title);
  };
  //const [searchQuery, setSearchQuery] = React.useState("");

  //const onChangeSearch = (query) => setSearchQuery(query);
  const onChangeSearch = (text) => searchFilterFunction(text);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconcontainer}>
          <FontAwesome name={"user"} size={40} color={"gray"} />
        </TouchableOpacity>

        <Searchbar
          round
          searchIcon={{ size: 12 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
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
        <TouchableOpacity style={styles.iconcontainer}>
          <FontAwesome name={"table"} size={40} color={"skyblue"} />
          <Text>My patients</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconcontainer}
          onPress={() => navigation.navigate("Home")}
        >
          <FontAwesome name={"eye"} size={40} color={"gray"} />
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

export default NurseDashboard;

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
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
