import { StatusBar } from 'expo-status-bar';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import EventsList from './components/EventsList';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <View style={styles.container}>
      <Navbar />
      <MapView style={styles.map}>
        <EventsList />
      </MapView>
      <StatusBar style="auto" />
    </View>
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
