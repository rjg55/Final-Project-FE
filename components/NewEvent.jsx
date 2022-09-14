import { getCoordsFromLocation } from "../api";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Button,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";


const NewEvent = () => {
  
  const navigation = useNavigation();
  const [showConfirm, setShowConfirm] = useState(false)
  const [location, onChangeText] = useState("");
  const [searchCoords, setSearchCoords] = useState({
    lat: 53.4808,
    lng: -2.2426,
  });
  console.log(searchCoords);
  const handleSubmit = () => {

    console.log(location);
    console.log(location.trim());
    getCoordsFromLocation(location.trim())
      .then((coordsFromApi) => {
        setSearchCoords(coordsFromApi);
        setShowConfirm(true)  
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const _map = React.useRef(null);

  const onYes= () => {
    if (searchCoords !== undefined) {
      navigation.navigate('NewEventForm', {location, searchCoords})
    } else {
      setShowConfirm(false)
    }
  }

  const onNo = () => {
    setShowConfirm(false)
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        style={styles.map}
        initialRegion={{
          latitude: 53.4808,
          longitude: -2.2426,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
        region={{latitude: searchCoords.lat, longitude: searchCoords.lng, latitudeDelta: 0.05,
          longitudeDelta: 0.05,}}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: searchCoords.lat,
            longitude: searchCoords.lng,
          }}
        ></Marker>
      </MapView>
        <Text style={(!showConfirm) ? styles.noTextBox: styles.textBox}>Confirm location? {'\n\n'}<Button title='yes'onPress={onYes}><Text>Yes</Text></Button><Button title='no' onPress={onNo}><Text>No</Text></Button>
        </Text>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          value={location}
          style={{ flex: 1, padding: 0 }}
          onChangeText={onChangeText}
        />
        <Ionicons
          name="ios-search"
          size={20}
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
      
    </View>
  );
};

export default NewEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  textBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 100 : 80,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});