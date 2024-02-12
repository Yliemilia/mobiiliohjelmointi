import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);
 
  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setRecipes(responseJson.meals))
    .catch(error => { 
        Alert.alert('Error', error); 
    });    
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{flex: 1}}>
        <TextInput 
          style={{fontSize: 18, width: 200}} 
          placeholder='Type keyword' 
          value={keyword}
          onChangeText={text => setKeyword(text)} 
        />
        <Button title="Find" onPress={getRecipes} />
      </View>
      <View style={{flex: 6}}>
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({item}) => 
            <View style={{margin: 5}}>
              <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
              <Image style={{ width: 100, height: 100 }} source={{ uri: item.strMealThumb }}/>
            </View>}
          data={recipes} 
          ItemSeparatorComponent={listSeparator} /> 
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  marginTop: 100,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
});