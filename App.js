import "react-native-gesture-handler";
import Navbar from "./components/Navbar";
import { EventContext } from "./contexts/EventsContext";
import { useState, useEffect } from "react";
import { getEvents } from "./api.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Map from "./components/Map";
import Groups from "./components/Groups";

const Stack = createNativeStackNavigator();

export default function App() {
  const [events, setEvents] = useState([]);

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
      <EventContext.Provider value={{ events, setEvents }}>
        <Stack.Navigator>
          {/* <Navbar /> */}
          <Stack.Screen name="navBar" component={Navbar} />
          <Stack.Screen name="Home" component={Map} />
          <Stack.Screen name="Groups" component={Groups} />
        </Stack.Navigator>
      </EventContext.Provider>
    </NavigationContainer>
  );
}
