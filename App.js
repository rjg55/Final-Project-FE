import "react-native-gesture-handler";
import { EventContext } from "./contexts/EventsContext";
import { UserContext } from "./contexts/UserContext";
import { useState, useEffect } from "react";
import { getEvents } from "./api.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import SingleEvent from "./components/SingleEvent";
import MainPage from "./Pages/MainPage";
import SingleGroup from "./components/SingleGroup";
import AddGroup from "./components/AddGroup";
import Groups from "./components/Groups";
import Map from "./components/Map";
import Events from "./Pages/Events";

const Stack = createNativeStackNavigator();

export default function App() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({
    _id: "63161dc08f899990132f0ea6",
    username: "janester",
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
          <Text
            style={{
              paddingTop: 70,
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            UpMeet
          </Text>
          {/* <Navbar /> */}
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={MainPage}
              events={events}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Event Details" component={SingleEvent} />
            <Stack.Screen name="Group Details" component={SingleGroup} />
            <Stack.Screen name="Create Group" component={AddGroup} />
          </Stack.Navigator>
        </EventContext.Provider>
      </UserContext.Provider>
    </NavigationContainer>
  );
}
