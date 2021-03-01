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

export default function adminLogin({navigation}) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  const adminLoginHandler = () => {
    // if (email === 'admin@admin.com' && password === 'admin786') {
    //   navigation.navigate('adminView');
    // } else {
    //   Alert.alert('Bad email and Password');
    // }
    navigation.navigate('adminView');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <Text style={styles.header}>Campus Recruitment App</Text>
        <Text style={styles.header}>Admin</Text>
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textColor} onPress={adminLoginHandler}>
            Login
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
