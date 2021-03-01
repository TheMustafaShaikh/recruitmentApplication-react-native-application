import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function RegisterStudent() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [name, setName] = useState('');
  let [number, setNumber] = useState(0);
  let [linkOfResume, setLinkofResume] = useState('');
  let [gpa, setGpa] = useState('');

  const CreateUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('student')
          .add({
            name: name,
            email: email,
            number: number,
            resumeURL: linkOfResume,
            gpa: gpa,
            type: 'student',
          })
          .then(() => {
            Alert.alert('Successfully registered');
          });
      })
      .catch((e) => {
        Alert(e.message());
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <Text style={styles.header}>Student Registeration</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          placeholder="Enter email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="number-pad"
          onChangeText={(text) => setNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter link of Resume"
          onChangeText={(text) => setLinkofResume(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Gpa"
          onChangeText={(text) => setGpa(text)}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textColor} onPress={CreateUser}>
            Register Student
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  input: {
    width: '60%',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  button: {
    backgroundColor: '#0e96eb',
    padding: 10,
    color: 'white',
    marginTop: 10,
    width: '60%',
  },
  textColor: {
    color: 'white',
    textAlign: 'center',
  },
  textLink: {
    color: '#0e96eb',
    marginTop: 10,
  },
});
