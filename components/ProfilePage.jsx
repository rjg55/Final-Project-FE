import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/FontAwesome";

const ProfilePage = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>{user.username}</Text>
        <Text style={styles.title}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.number}>
          {user.thanks} <MaterialCommunityIcons name="thumbs-o-up" size={40} />
        </Text>
        <Text style={styles.thanks}>Thanks</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.category}>Email: </Text>
        <Text style={styles.description}>{user.email}</Text>
        <Text style={styles.category}>Date of Birth:</Text>
        <Text style={styles.description}>
          {format(new Date(user.dateOfBirth), "d MMM yyyy")}
        </Text>
        <Text style={styles.category}>Phone Number:</Text>
        <Text style={styles.description}>{user.phoneNumber}</Text>
        <Text style={styles.category}>Profile Created:</Text>
        <Text style={styles.description}>
          {format(new Date(user.createdAt), "d MMM yyyy")}
        </Text>
        <Button
          title="Edit Profile"
          color="#FF6347"
          onPress={() => navigation.navigate("Edit Profile")}
        />
      </View>
    </ScrollView>
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
  thanks: {
    paddingBottom: 10,
    fontSize: 15,
    textTransform: "uppercase",
    alignSelf: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 5,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "semi-bold",
    alignSelf: "center",
    fontStyle: "italic",
  },
  description: {
    fontSize: 20,
    alignSelf: "center",
    paddingBottom: 10,
  },
  number: {
    fontSize: 50,
    alignSelf: "center",
  },
  category: {
    fontSize: 12,
    paddingLeft: 10,
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
