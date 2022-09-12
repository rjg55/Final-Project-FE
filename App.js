import { StatusBar } from 'expo-status-bar';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import EventMarkerList from './components/EventMarkerList';
import Navbar from './components/Navbar';
import { NativeRouter, Route, Link, Routes } from 'react-router-native';
import { EventContext } from './contexts/EventsContext';
import { useState, useEffect } from 'react';
import { getEvents } from './api.js';
import EventList from './components/EventList';

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
    <NativeRouter>
      <EventContext.Provider value={{ events, setEvents }}>
        <View style={styles.container}>
          <Navbar />
          <MapView style={styles.map}>
            <EventMarkerList />
          </MapView>
          <StatusBar style="auto" />
        </View>
        {/* <Routes>
          <Route exact path="/events" component={EventList} />
        </Routes> */}
      </EventContext.Provider>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
