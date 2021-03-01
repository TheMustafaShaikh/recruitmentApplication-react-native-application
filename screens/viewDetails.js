import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function ViewDetails({route, navigation}) {
  let {type} = route.params;
  const [fullData, setFullData] = useState([]);
  useEffect(() => {
    if (type == 'company') {
      firestore()
        .collection('student')
        .onSnapshot((e) => {
          e.docs.map((e) => {
            setFullData((fullData) => [
              ...fullData,
              {
                id: e.id,
                name: e.data().name,
                gpa: e.data().gpa,
                email: e.data().email,
                number: e.data().number,
                resume: e.data().resumeURL,
              },
            ]);
          });
        });
    }else{
        firestore()
        .collection('company')
        .onSnapshot((e) => {
          e.docs.map((e) => {
            setFullData((fullData) => [
              ...fullData,
              {
                id: e.id,
                name: e.data().name,
                email: e.data().email,
                number: e.data().number,
    
              },
            ]);
          });
        });
    }
  }, []);
 

  return (
    <View>
      {type == 'student' ? (
        <FlatList
          data={fullData}
          renderItem={({item}) => (
            <View style={styles.section}>
              <Text>Company Name: {item.name}</Text>
              <Text>Company email: {item.email}</Text>
              <Text>Company number: {item.number}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={fullData}
          renderItem={({item}) => (
            <View style={styles.section}>
              <Text>Student Name: {item.name}</Text>
              <Text>Student email: {item.email}</Text>
              <Text>Student number: {item.number}</Text>
              <Text>Student resume: {item.resume}</Text>
              <Text>Student gpa: {item.gpa}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 10,
    backgroundColor: '#F6F8FA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    margin: 8,
  },
});
