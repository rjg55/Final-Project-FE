import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";
import { postEvent } from "../api.js";
import DateTimePicker from '@react-native-community/datetimepicker'
import { set } from "date-fns/esm";
import { EventContext } from "../contexts/EventsContext";

const AddEvent = ({route}) => {
  const { events, setEvents } = useContext(EventContext);
  const { user } = useContext(UserContext);
  const {location, searchCoords} = route.params
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [newEventCategory, setNewEventCategory] = useState("");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventLocation, setNewEventLocation] = useState(location)
  const [newEventStartTime, setNewEventStartTime] = useState("");
  const [newEventEndTime, setNewEventEndTime] = useState("");
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
  const navigation = useNavigation()
  const { username } = user;
  const coords = {lat: searchCoords.lat, long: searchCoords.lng}
  
  const handleSubmit = () => {
    if (!coords) {
        navigation.navigate('Home')
    }
    postEvent(newEventTitle,
        newEventCategory,
        newEventDescription,
        newEventLocation,
        coords,
        newEventStartTime,
        newEventEndTime,
        username)
      .then((postedEvent) => {
        setEvents((currEvents) => {
          return [...currEvents, postedEvent]
        })
        setNewEventCategory("");
        setNewEventDescription("");
        setNewEventTitle("");
        setNewEventStartTime("");
        setNewEventEndTime("");
      })
      .catch((error) =>{
        console.log(error);
      }
      );

      Alert.alert("Event added!", "You can safely leave this page.", [
        { text: "ok", onPress: () => {navigation.navigate('Home')} },
      ]);
  };

  if (err) {
    return <Text style={styles.description}>{err}</Text>;
  }

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [datePicker, setDatePicker] = useState(false)
  const [startTimePicker, setStartTimePicker] = useState(false)
  const [endTimePicker, setEndTimePicker] = useState(false)

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setNewEventStartTime(currentDate)
    setDatePicker(false)
  };
  const onChangeStartTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setNewEventStartTime(currentDate)
    setStartTimePicker(false)
  };
  const onChangeEndTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setNewEventEndTime(currentDate)
    setDate(currentDate);
    setEndTimePicker(false)
  };

  const showDatepicker = () => {
    setDatePicker(true)
  };

  const showStartTimepicker = () => {
    setStartTimePicker(true)
  };

  const showEndTimepicker = () => {
    setEndTimePicker(true)
  };

 
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Create Event </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Title"
        value={newEventTitle}
        onChangeText={setNewEventTitle}
      />
      <Text style={styles.formLabel}>Category:</Text>
      <Picker
        style={styles.formPicker}
        selectedValue={newEventCategory}
        onValueChange={(currentGroupCategory) =>
          setNewEventCategory(currentGroupCategory)
        }
      >
        {validGroupCategories.map((category, index) => {
          return (
            <Picker.Item
            key={index}
              label={category}
              value={category !== "all" ? category : ""}
            />
          );
        })}
      </Picker>
      <TextInput
        style={styles.inputStyle}
        placeholder="Write event details here"
        value={newEventDescription}
        onChangeText={setNewEventDescription}
      />
      <Text>Location: {location}</Text>
      <View>
      <TouchableOpacity style={styles.btn} onPress={showDatepicker} title="Pick a date"><Text style={styles.btnText}>Pick a date</Text></TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={showStartTimepicker} title="Pick a start time"><Text style={styles.btnText}>Pick a start time</Text></TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={showEndTimepicker} title="Pick an end time"><Text style={styles.btnText}>Pick an end time</Text></TouchableOpacity>
      <Text style={styles.btnText}>Start Time: {`${newEventStartTime}`}</Text>
      <Text style={styles.btnText}>End Time: {`${newEventEndTime}`}</Text>
      {datePicker && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode='date'
          is24Hour={true}
          onChange={onChangeDate}
        />
      )}
      {startTimePicker && (
        <DateTimePicker
          testID="startTimePicker"
          value={date}
          mode='time'
          is24Hour={true}
          onChange={onChangeStartTime}
        />
      )}
      {endTimePicker && (
        <DateTimePicker
          testID="endTimePicker"
          value={date}
          mode='time'
          is24Hour={true}
          onChange={onChangeEndTime}
        />
      )}
    </View>
      <Button
        title="Create Event"
        color="#FF6347"
        onPress={handleSubmit}
        disabled={newEventTitle === "" ? true : false}
      />
    </View>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  btn: {
    // paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FF6347",
    color: "#fff",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 50,
  },
  btnText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
  },
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
    MainContainer: {
        flex: 1,
        padding: 6,
        alignItems: 'center',
        backgroundColor: 'white'
      },
     
      text: {
        fontSize: 25,
        color: 'red',
        padding: 3,
        marginBottom: 10,
        textAlign: 'center'
      },
     
      // Style for iOS ONLY...
      datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
      },
  });