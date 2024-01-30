import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, KeyboardAvoidingView, Platform, FlatList } from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [lista, setLista] = useState([]);

  const addItem = () => {
    setLista([...lista, {name: item}]);
    setItem('');
  };

  const clearList = () => {
    setLista([]);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setItem(text)}
            value={item}
            keyboardType="default"/>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
          <Button onPress={addItem} title="ADD" />
          </View>
          <View style={styles.button}>
          <Button onPress={clearList} title="CLEAR" />
          </View>
        </View>
        <Text style={{color:'purple', fontWeight:'bold'}}>Shopping List</Text>
        <FlatList
          data={lista}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.results}>
              <Text>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  inner: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: 120,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 30,
  },
  button: {
    width: 100,
    backgroundColor: 'pink',
    borderRadius: 30,
  }
});