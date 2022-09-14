import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import deleteMessage from '../api';

const DeleteMessage = (id, setMessages) => {
  const handleDelete = () => {
    deleteMessage(id).then(() => {
      setMessages((curr) => curr);
    });
  };

  return (
    <TouchableOpacity
      style={styles.title}
      onPress={() => {
        handleDelete;
      }}>
      <Text>Delete</Text>
    </TouchableOpacity>
  );
};

export default DeleteMessage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10
  },
  description: {
    fontSize: 16,
    paddingLeft: 10,
    paddingBottom: 30,
    paddingTop: 20
  },
  date: {
    fontSize: 14,
    paddingLeft: 10,
    paddingBottom: 15,
    fontWeight: 'bold'
  }
});
