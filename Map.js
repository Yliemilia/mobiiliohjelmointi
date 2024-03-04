import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

  const [location, setLocation] = useState(null);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to get location')
      return;
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setLocation(location);
    console.log('Location:', location)
  };

  useEffect(() => {getLocation()}, []);

  const initial = {
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  };

  const coordinates = {
    latitude: 60.201373,
    longitude: 24.934041
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initial}
      >
        <Marker
          coordinate={coordinates}
          title='Haaga-Helia'
        />
      </MapView>
      <TextInput></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "75%"
  }
});