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
import firestore from '@react-native-firebase/firestore'

export default function Login({navigation}) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const loginHandler = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firestore().collection("student").onSnapshot((res)=>{
          res.docs.map((el)=>{
            if(el.data().email == email){
              navigation.navigate('details', {type: 'student'});
              setEmail('');
              setPassword('');
            }
          })
        })

        
      })
      .catch((e) => Alert.alert('bad email or password'));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <Text style={styles.header}>Campus Recruitment App</Text>
        <Text style={styles.header}>Student</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          placeholder="password"
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textColor} onPress={loginHandler}>
            Login
          </Text>
        </TouchableOpacity>

        <Text
          style={styles.textLink}
          onPress={() => navigation.navigate('registerStudent')}>
          Click here to register Student
        </Text>

        <Text
          style={styles.textLink}
          onPress={() => navigation.navigate('adminLogin')}>
          Click here to admin login
        </Text>
        <Text
          style={styles.textLink}
          onPress={() => navigation.navigate('companyLogin')}>
          Click here to company login
        </Text>
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
