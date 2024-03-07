import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setContacts(data);
        console.log(data);
      }
    }
  }

  const renderItem = ({ item }) => (
    <View>
      {item.phoneNumbers && item.phoneNumbers.length > 0 && (
        <Text>{item.name} {item.phoneNumbers[0].number}</Text>
      )}
    </View>
  );

  return (

    <View style={styles.container} >
      <FlatList
        style= {styles.flatlist}
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />
      <Button style={styles.button} title="Get contacts" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    width: "100%"
  },
  button: {
    flex: 1
  },
  flatlist: {
    flex: 3,
  }
});