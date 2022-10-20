import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';

const Navbar = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>React Native</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
    position: 'absolute',
    top: 50,
    width: Dimensions.get('window').width,
    height: 100
  },
  title: {
    marginTop: 0,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default Navbar;
