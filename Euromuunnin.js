import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Text, Alert, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'

export default function App() {

  const [rates, setRates] = useState({});
  const [selected, setSelected] = useState('');
  const [amount, setAmount] = useState('');
  const [eur, setEur] = useState('');

  const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

  const getData = async () => {
    const url = 'https://api.apilayer.com/exchangerates_data/latest';
    const options = {
      headers: {
        apikey: API_KEY
      }
    };

    try {
      const response = await fetch(url, options);
      console.log('Response status', response.status);
      const currencyData = await response.json();
      console.log(currencyData);
      setRates(currencyData.rates);
    } catch (e) {
      Alert.alert('Error fetching data');
    }
  }

  useEffect(() => { getData() }, []);

  const convert = () => {
    console.log("Selected currency rate:", rates[selected]);
    if (!rates[selected]) {
      Alert.alert('Error')
      return;
    }
    const amountEur = Number(amount)/rates[selected];
    setEur(`${amountEur.toFixed(2)}€`);
  }

  return (
    <View style ={styles.container}>
      <Text style={{ ...styles.valuerow, ...styles.text}}>{eur}</Text>
      <View style={styles.inputrow}>
        <TextInput
        style={styles.text}
        placeholder={'Amount'}
        keyboardType='numeric'
        value={amount}
        onChangeText={text => setAmount(text)}/>
        <Picker style={styles.picker}
        selectedValue={selected}
        onValueChange={(itemValue, itemIndex) => {
          console.log(itemValue, itemIndex);
          setSelected(itemValue);
        }}
        >
          {Object.keys(rates).sort().map(key => (<Picker.Item label={key} value ={key} key={key} />))}
        </Picker>
      </View>
      <Button style={styles.button} title='Convert' onPress={convert}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    padding: 10
  },
  picker: {
    width: 150
  },
  button:{
    borderBlockColor: "blue"
  }
})