import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Calculator" component={Calculator} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

function Calculator({ navigation }) {

  const [luku1, setLuku1] = useState('');
  const [luku2, setLuku2] = useState('');
  const [result, setResult] = useState('');
  const [laskut, setLaskut] = useState([]);

  const buttonPressed = (lasku) => {
    let eka = Number(luku1);
    let toka = Number(luku2);
    let laskuRivi=0;

    if (lasku === '+') {
      laskuRivi= eka + toka;
    } else if (lasku === '-') {
      laskuRivi= eka-toka;
    }

    setResult(`Result: ${laskuRivi}`);
    setLaskut([...laskut, {calculation: `${eka}${lasku}${toka}`, sum: laskuRivi}]);
    setLuku1('');
    setLuku2('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
      <Text style={styles.resultText}>{result}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLuku1(text)}
          value={luku1}
          keyboardType="numeric" />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLuku2(text)}
          value={luku2}
          keyboardType="numeric" />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button onPress={() => buttonPressed('+')} title="+" />
        </View>
        <View style={styles.button}>
          <Button onPress={() => buttonPressed('-')} title="-" />
        </View>
        <View style={styles.button}>
        <Button title="History" onPress={() => navigation.navigate('History', { laskut })} />
        </View>
      </View>
      </View>
    </View>
  );
}

function History( { route}) {

  const {laskut} = route.params;
  
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
      <View style={styles.history}>
      <Text style={{fontSize:30}}>History</Text>
      
      <FlatList
          data={laskut}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.results}>
              <Text>{item.calculation}={item.sum}</Text>
            </View>
          )}
        />
        </View>
        </View>
    </View>
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
    justifyContent: 'center'
  },
  inputContainer: {
    marginBottom: 5,
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 30,
    alignSelf: 'stretch'
  },
  resultText: {
    fontSize: 30,
    justifyContent: 'center'
  },
  button: {
    width: 90,
    backgroundColor: 'lightblue',
    borderRadius: 30,
  },
  results: {
    justifyContent: 'center',
    fontSize: 30
  },
  history: {
    justifyContent: 'center',
    fontSize: 30,
  }
});