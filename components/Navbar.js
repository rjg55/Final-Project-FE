import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Navbar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native</Text>
      <Button
        title="groupsNavButton"
        onPress={() => {
          navigation.navigate("Groups");
        }}
      ></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
    position: "absolute",
    bottom: 100,
  },
  title: {
    marginTop: 600,
    marginBottom: 30,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Navbar;
