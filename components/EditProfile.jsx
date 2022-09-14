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

const EditProfile = () => {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [groupCategory, setGroupCategory] = useState("");
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [newGroupDescription, setNewGroupDescription] = useState("");

  const handleSubmit = () => {};
  //     postGroup(newGroupName, groupCategory, newGroupDescription, username)
  //       .then(() => {
  //         setGroupCategory("");
  //         setNewGroupDescription("");
  //         setNewGroupName("");
  //       })
  //       .catch((error) =>
  //         setErr(`${error.response.status} ${error.response.statusText}`)
  //       );
  //   };

  if (err) {
    return <Text style={styles.description}>{err}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}> First Name </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Text style={styles.text}> Last Name </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <Button title="Save Changes" onPress={handleSubmit} />
    </View>
  );
};

export default EditProfile;

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
