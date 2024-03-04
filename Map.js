import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  };

  const [region, setRegion] = useState(initial);
  const [address, setAddress] = useState('');

  const fetchCoordinates = (address) => {
    const KEY = process.env.EXPO_PUBLIC_GEOCODING_API_KEY;
    const url = `https://geocode.maps.co/search?q=${address}&api_key=${KEY}`;

  fetch(url)
    .then(response=> response.json())
    .then(data => {
      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);
      console.log(lat, lng);
      console.log(data)

      setRegion({ ...region, latitude: lat, longitude: lng})
  })
.catch(error => console.error('API call failed', error.message))
}

return (
  <KeyboardAvoidingView style={styles.container} behavior='padding'>
    <MapView
      style={styles.map}
      region={region}>
      <Marker coordinate={region}/>
    </MapView>
    <TextInput style={styles.input} placeholder= {'Address'} value={address}
    onChangeText={text => setAddress(text)}/>
    <View style={styles.button}>
      <Button title='Show' onPress={() => fetchCoordinates(address)}/>
    </View>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  map: {
    flex: 7,
    width: "100%",
    height: "75%"
  },
  textinput: {
    flex: 1
  },
  button: {
    flex: 1,
  }
});