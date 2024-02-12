import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Calculator } from './Calculator';
import { History } from './History';

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