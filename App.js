import { EventContext } from "./contexts/EventsContext";
import { UserContext } from "./contexts/UserContext";
import { useState, useEffect } from "react";
import { getEvents } from "./api.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from 'react-native';
import SingleEvent from "./components/SingleEvent";
import MainPage from "./Pages/MainPage";
import SingleGroup from "./components/SingleGroup";
import AddGroup from "./components/AddGroup";
import Groups from "./components/Groups";
import Map from "./components/Map";
import Events from "./Pages/Events";
import { TouchableHighlight, Button, Image, StyleSheet } from "react-native";
import ProfilePage from "./components/ProfilePage";
import EditProfile from "./components/EditProfile";
import Header from "./components/Header";
import NewEvent from "./components/NewEvent";

const Stack = createNativeStackNavigator();

export default function App() {

  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({
    _id: "63161dc08f899990132f0ea6",
    firstName: "Jane",
    lastName: "Harrison",
    username: "janester",
    password: "jane1234",
    email: "jane@gmail.com",
    phoneNumber: "07791210455",
    dateOfBirth: "2001-09-18T00:00:00.000Z",
    thanks: 0,
    __v: 0,
    createdAt: "2022-09-05T16:03:12.539Z",
    updatedAt: "2022-09-05T16:03:12.539Z",
  });

  useEffect(() => {
    getEvents()
      .then((eventsFromApi) => {
        setEvents(eventsFromApi);
      })
      .catch((err) => {
        setError({ err });
      });
  }, []);


  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        <EventContext.Provider value={{ events, setEvents }}>

          <Header />
          <Text
            style={{
              paddingTop: 70,
              paddingBottom: 20,
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
              color: "#FF6347",
            }}
          >
            UpMeet
          </Text>
          {/* <Navbar /> */}
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={MainPage}
              events={events}
            />
            <Stack.Screen name="Event Details" component={SingleEvent} />
            <Stack.Screen name="Group Details" component={SingleGroup} />
            <Stack.Screen name="Create Group" component={AddGroup} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="Edit Profile" component={EditProfile} />
            <Stack.Screen name="NewEvent" component={NewEvent} />
          </Stack.Navigator>
        </EventContext.Provider>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
