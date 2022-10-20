import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { sendEventMessage } from '../api';
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

const AddMessage = ({ _id }) => {
  const { user } = useContext(UserContext);

  const [ text, setText ] = useState('');
  const [ done, setDone ] = useState('Add comment');
  const [ color, setColor ] = useState('#fff');

  const handleSubmit = () => {
    if (text !== '') {
      sendEventMessage(_id, user._id, text).then(() => {
        setText('');
        setDone('Posted');
        setTimeout(() => {
          setDone('Add a comment');
        }, 1500);
      });
    } else {
      setText('');
      setDone('Please add a comment');
      setColor('red');
      setTimeout(() => {
        setDone('Add a comment');
        setColor('#fff');
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outerbox}>
        <TextInput
          onChangeText={setText}
          value={text}
          style={styles.textField}
          borderColor={color}
          backgroundColor="#fff"
          placeholder="Add a comment"
        />
        <TouchableOpacity
          title="Add Comment"
          type="submit"
          style={styles.btn}
          onPress={handleSubmit}>
          <Text style={styles.btnText}>{done}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddMessage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#d3d7de',
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
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingLeft: 20,
    borderWidth: 1.5,
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
