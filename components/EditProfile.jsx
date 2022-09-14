import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import { patchUser } from "../api.js";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [groupCategory, setGroupCategory] = useState("");
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(user.dateOfBirth));
  const [open, setOpen] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpen(false);
    setDateOfBirth(currentDate);
  };

  const handleSubmit = () => {
    patchUser(
      user._id,
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      dateOfBirth
    )
      .then((data) => {
        setUser(data.user);
        Alert.alert("Profile updated!", "You can safely leave this page.", [
          { text: "ok" },
        ]);
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
      <Text style={styles.text}> Username </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.text}> Email </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.text}> Phone Number </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Edit DoB" onPress={() => setOpen(true)} />
      {open && <DateTimePicker value={dateOfBirth} onChange={onChange} />}
      <Text> </Text>
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
  },
  formLabel: {
    fontSize: 20,
    color: "#FFFFFF",
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
    color: "#FFFFFF",
    fontSize: 20,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
