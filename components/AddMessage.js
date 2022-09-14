import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { EventContext } from '../contexts/EventsContext';
import { sendEventMessage } from '../api';
import {
  TextInput,
  SafeAreaView,
  Button,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

const AddMessage = ({ id, setNewComment }) => {
  //   const { user } = useContext(UserContext);
  //   const { event } = useContext(EventContext);

  const [ text, setText ] = useState('');

  //   const [ done, setDone ] = useState('Add comment');
  //   const [ disabled, setDisabled ] = useState(false);
  //   const [ sent, setSent ] = useState('');
  //   const [ message, setMessage ] = useState('');
  //   const [ color, setColor ] = useState('primary');

  //   const handleSubmit = () => {
  //     if (message === '') {
  //       setColor('error');
  //       setDone('Please type a comment first');
  //       setTimeout(() => {
  //         setColor('primary');
  //         setDone('Add a comment');
  //       }, 1000);
  //     } else {
  //       setDisabled(true);
  //       sendEventMessage(event._id, user.userTag, message).then(() => {
  //         setDisabled(false);
  //         setDone(<Done />);
  //         setSent('posted');
  //         setColor('success');
  //         setTimeout(() => {
  //           setSent('');
  //           setDone('Add Comment');
  //           setColor('primary');
  //         }, 1500);
  //         setMessage('');
  //         setNewComment(true);
  //       });
  //     }
  //   };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outerbox}>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          style={styles.textField}
          placeholder="Add a comment"
        />
        <TouchableOpacity title="Add Comment" type="submit" style={styles.btn}>
          <Text style={styles.btnText}>Add Comment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddMessage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  textField: {
    height: 50,
    // backgroundColor: '#fff',
    borderRadius: 5,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: '#FF6347',
    padding: 10,
    height: 60
  },
  outerbox: {
    padding: 10
  },
  btn: {
    // paddingBottom: 20,
    backgroundColor: '#FF6347',
    color: '#fff',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 50
  },
  btnText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold'
  }
});
