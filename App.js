import 'react-native-geture-handler';
import Navbar from './components/Navbar';
import { EventContext } from './contexts/EventsContext';
import { useState, useEffect } from 'react';
import { getEvents } from './api.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './components/Map';

const Stack = createNativeStackNavigator();

export default function App() {
  const [ events, setEvents ] = useState([]);

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
        <Navbar />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Map} />
        </Stack.Navigator>
      </EventContext.Provider>
    </NavigationContainer>
  );
}
