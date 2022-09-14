import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import { postGroup } from "../api.js";

const AddGroup = () => {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [groupCategory, setGroupCategory] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");

  const validGroupCategories = [
    "outdoors",
    "sport",
    "nightlife",
    "leisure",
    "hobbies",
    "daytrips",
    "film",
    "all", //This will be value of undefined
  ];

  const { username } = user;

  const handleSubmit = () => {
    postGroup(newGroupName, groupCategory, newGroupDescription, username)
      .then(() => {
        setGroupCategory("");
        setNewGroupDescription("");
        setNewGroupName("");
      })
      .catch((error) =>
        setErr(`${error.response.status} ${error.response.statusText}`)
      );
  };

  if (err) {
    return <Text style={styles.description}>{err}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Create Group </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="New Group Name"
        value={newGroupName}
        onChangeText={setNewGroupName}
      />
      <Text style={styles.formLabel}>Category:</Text>
      <Picker
        style={styles.formPicker}
        selectedValue={groupCategory}
        onValueChange={(currentGroupCategory) =>
          setGroupCategory(currentGroupCategory)
        }
      >
        {validGroupCategories.map((category) => {
          return (
            <Picker.Item
              label={category}
              value={category !== "all" ? category : ""}
            />
          );
        })}
      </Picker>
      <TextInput
        style={styles.inputStyle}
        placeholder="Please provide a short description"
        value={newGroupDescription}
        onChangeText={setNewGroupDescription}
      />
      <Button
        title="Create+"
        onPress={handleSubmit}
        disabled={newGroupName === "" ? true : false}
      />
    </View>
  );
};

export default AddGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    alignItems: "center",
    // justifyContent: "center",
  },

  formPicker: {
    color: "black",
    fontSize: 20,
    paddingTop: 0,
    paddingHorizontal: 90,
    borderRadius: 50,
    backgroundColor: "white",
    margin: 10,
  },

  formLabel: {
    fontSize: 20,
    color: "#fff",
    marginTop: 20,
  },
  inputStyle: {
    marginTop: 20,
    marginBottom: 10,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "white",
  },
  formText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 20,
  },
  text: {
    color: "#fff",
    fontSize: 30,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: "white",
//     borderRadius: 5,
//     padding: 10,
//     margin: 10,
//     shadowColor: "#171717",
//     shadowOffset: { width: -2, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   admin: {
//     paddingLeft: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     padding: 10,
//   },
//   description: {
//     fontSize: 16,
//     paddingLeft: 10,
//     paddingBottom: 10,
//   },
//   date: {
//     fontSize: 14,
//     paddingLeft: 10,
//     paddingBottom: 15,
//     fontWeight: "bold",
//   },
//   startTime: {
//     fontSize: 13,
//     paddingLeft: 10,
//     paddingBottom: 5,
//   },
//   endTime: {
//     fontSize: 13,
//     paddingLeft: 10,
//     paddingBottom: 5,
//   },
//   details: {
//     fontSize: 15,
//     paddingLeft: 10,
//     paddingTop: 10,
//     paddingBottom: 5,
//     fontWeight: "bold",
//   },
// });
