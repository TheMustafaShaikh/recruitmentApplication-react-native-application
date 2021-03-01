import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function AdminView() {
  let [status, setStatus] = useState(true);
  const [fullData, setFullData] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [UpdateID, setUpdateID] = useState(0);

  useEffect(() => {
    setFullData(['']);
    if (status) {
      setFullData(['']);
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
    } else {
      setFullData(['']);
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
    }
  }, [status]);

  const deleteCompany = (id) => {
    firestore().collection('company').doc(id).delete();
  };

  const deleteStudent = (id) => {
    firestore().collection('student').doc(id).delete();
  };

  let [nameC, setNameC] = useState('');
  let [numberC, setNumberC] = useState('');

  const updateCompany = (id, name, email, number) => {
    setModalStatus(true);
    setUpdateID((setUpdateID) => id);
    setNameC((nameC) => name);
    setNumberC((numberC) => number);
  };

  const updateHandlerCompany = () => {
    firestore().collection('company').doc(UpdateID).update({
      name: nameC,
      number: numberC,
    });
    setModalStatus(false);
  };

  const [modal2, setModal2] = useState(false);
  const [StudentID, setStudentId] = useState('');
  const [nameS, setNameS] = useState('');
  const [numberS, setNumberS] = useState('');
  const [urlS, setUrlS] = useState('');
  const [gpaS, setGpaS] = useState('');

  const updateStudent = (id, name, url, number, gpa) => {
    setModal2(true);
    setStudentId((StudentID) => id);
    setNameS((nameS) => name);
    setNumberS((numberS) => number);
    setUrlS((urlS) => url);
    setGpaS((gpaS) => gpa);
  };

  const updateHandlerStudent = () => {
    firestore().collection('student').doc(StudentID).update({
      name: nameS,
      number: numberS,
      gpa: gpaS,
      resumeURL: urlS,
    });
    setModal2(false);
  };

  return (
    <View>
      <ScrollView>
        <Button title="Company" onPress={() => setStatus(true)} />
        <Button title="Student" onPress={() => setStatus(false)} />

        {status ? (
          <FlatList
            data={fullData}
            renderItem={({item}) => (
              <View style={styles.section}>
                <Text>Company Name: {item.name}</Text>
                <Text>Company email: {item.email}</Text>
                <Text>Company number: {item.number}</Text>
                <Button
                  title="update"
                  onPress={() =>
                    updateCompany(item.id, item.name, item.email, item.number)
                  }
                />
                <Button
                  title="delete"
                  onPress={() => deleteCompany(item.id, item.email)}
                />
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
                <Button
                  title="update"
                  onPress={() =>
                    updateStudent(
                      item.id,
                      item.name,
                      item.resume,
                      item.number,
                      item.gpa,
                    )
                  }
                />
                <Button
                  title="delete"
                  onPress={() => deleteStudent(item.id, item.email)}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </ScrollView>

      <Modal visible={modalStatus}>
        <View style={styles.section}>
          <TextInput value={nameC} onChangeText={(text) => setNameC(text)} />
          <TextInput
            value={numberC}
            onChangeText={(text) => setNumberC(text)}
          />
          <Button title="submit" onPress={updateHandlerCompany} />
        </View>
      </Modal>

      <Modal visible={modal2}>
        <View style={styles.section}>
          <TextInput value={nameS} onChangeText={(text) => setNameS(text)} />
          <TextInput
            value={numberS}
            onChangeText={(text) => setNumberS(text)}
          />
          <TextInput value={gpaS} onChangeText={(text) => setGpaS(text)} />
          <TextInput value={urlS} onChangeText={(text) => setUrlS(text)} />
          <Button title="submit" onPress={updateHandlerStudent} />
        </View>
      </Modal>
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
