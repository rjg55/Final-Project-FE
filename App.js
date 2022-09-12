// import 'react-native-geture-handler';
import Navbar from './components/Navbar';
import { EventContext } from './contexts/EventsContext';
import { useState, useEffect } from 'react';
import { getEvents } from './api.js';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button, Text } from 'react-native';
import Map from './components/Map';
import Events from './Pages/Events';

const Tab = createMaterialTopTabNavigator();

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
        <Text
          style={{
            paddingTop: 70,
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold'
          }}>
          UpMeet
        </Text>
        {/* <Navbar /> */}
        <Tab.Navigator style={{ paddingTop: 20 }}>
          <Tab.Screen name="Map View" component={Map} />
          <Tab.Screen name="Events" component={Events} />
        </Tab.Navigator>
      </EventContext.Provider>
    </NavigationContainer>
  );
}
