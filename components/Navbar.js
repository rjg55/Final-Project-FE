import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';

const Navbar = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>React Native</Text>
    {/* <Button title="Press Me" onPress={() => navigation.navigate('Events')}>
      Press Me
    </Button> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
    position: 'absolute',
    top: 50,
    // zIndex: 2,
    width: Dimensions.get('window').width,
    height: 100
  },
  title: {
    marginTop: 0,
    // marginBottom: 30,
    // paddingVertical: 8,
    // borderWidth: 4,
    // borderColor: '#20232a',
    // borderRadius: 6,
    // backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default Navbar;
