import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { getEventMessages } from '../api';
import { formatDistance } from 'date-fns';
import { UserContext } from '../contexts/UserContext';
import DeleteMessage from './DeleteMessage';

const EventMessages = ({ _id }) => {
  const { user } = useContext(UserContext);
  const [ messages, setMessages ] = useState([]);

  useEffect(
    () => {
      getEventMessages(_id).then((messagesFromApi) => {
        const filtered = messagesFromApi.filter((msg) => msg.eventTag === _id);
        setMessages(filtered);
      });
    },
    [ messages ]
  );
  return (
    <ScrollView>
      {messages.map((message) => {
        const createdAt = formatDistance(
          new Date(message.createdAt),
          Date.now(),
          { addSuffix: true, includeSeconds: true }
          //   'd MMM yyyy @ h:mm:ss bbb'
        );
        return (
          <View style={styles.container} key={message._id}>
            <Text style={styles.description}>{message.message}</Text>
            <Text style={styles.date}>
              posted by: {user.username} - {createdAt}
            </Text>
            <DeleteMessage _id={message._id} setMessages={setMessages} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default EventMessages;

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
