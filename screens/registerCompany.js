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

export default function RegisterCompany() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [company, setCompany] = useState('');
  let [number, setNumber] = useState('');

  const RegisterCompanyHandler = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('company')
          .add({
            name: company,
            email: email,
            number: number,
            type: 'company',
          })
          .then(() => {
            Alert.alert('Successfully registered!');
          });
      })
      .catch((e) => {
        Alert(e.message());
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <Text style={styles.header}>Company Registeration</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          placeholder="Enter email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Company"
          onChangeText={(text) => setCompany(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter company number"
          keyboardType="number-pad"
          onChangeText={(text) => setNumber(text)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={RegisterCompanyHandler}>
          <Text style={styles.textColor}>Register Company</Text>
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
