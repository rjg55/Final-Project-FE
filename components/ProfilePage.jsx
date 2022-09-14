import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

const ProfilePage = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  console.log(user);

  return (
    <View style={styles.container}>
      <Text style={styles.host}>{user.username}</Text>
      <Text style={styles.title}>
        {user.firstName} {user.lastName}
      </Text>
      <Text style={styles.description}>Email: {user.email}</Text>
      <Text style={styles.description}>
        Date of Birth: {format(new Date(user.dateOfBirth), "d MMM yyyy")}
      </Text>
      <Text style={styles.description}>Phone Number: {user.phoneNumber}</Text>
      <Text style={styles.description}>Password: {user.password}</Text>
      <Text style={styles.description}>Thanks: {user.thanks}</Text>
      <Text style={styles.description}>
        Profile Created: {format(new Date(user.createdAt), "d MMM yyyy")}
      </Text>
      <Button
        title="Edit Profile"
        color="#FF6347"
        onPress={() => navigation.navigate("Edit Profile")}
      />
    </View>
  );

  //   insert your groups
  //   Your upcoming events?
  //   Thanks etc.
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  host: {
    paddingLeft: 10,
    fontSize: 10,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  description: {
    fontSize: 16,
    paddingLeft: 10,
    paddingBottom: 30,
    paddingTop: 20,
  },
  date: {
    fontSize: 14,
    paddingLeft: 10,
    paddingBottom: 15,
    fontWeight: "bold",
  },
  startTime: {
    fontSize: 13,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  endTime: {
    fontSize: 13,
    paddingLeft: 10,
    paddingBottom: 5,
  },
  location: {
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: "bold",
  },
});
