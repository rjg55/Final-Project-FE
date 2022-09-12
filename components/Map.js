import { StatusBar } from 'expo-status-bar';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import EventMarkerList from './EventMarkerList';
import EventsButton from './EventsButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Map = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        <EventMarkerList />
      </MapView>

      <StatusBar style="auto" />
    </View>
  );
};

export default Map;

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
    // height: 500
  }
});
