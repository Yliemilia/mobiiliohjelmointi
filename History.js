import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export function History( { route}) {

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