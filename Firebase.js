import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, TextInput, View, Button } from "react-native";
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBUXSHHmJWbvlL6BnqsvGcY9JM88kkPnMc",
  authDomain: "mobiili-885d1.firebaseapp.com",
  projectId: "mobiili-885d1",
  storageBucket: "mobiili-885d1.appspot.com",
  messagingSenderId: "330400801624",
  appId: "1:330400801624:web:856cbe4cfa9649efb97b2d",
  measurementId: "G-GQVDK6S2JQ"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {

  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [items, setItems ] = useState([]);

  useEffect(() => {
    onValue(ref(database, 'items/'), snapshot => {
      console.log(Object.values(snapshot.val()));
      const data= snapshot.val();
      setItems(Object.values(data));
    })
    }, []);

  const saveItem = () => {
      push(ref(database, 'items/'), {product, amount});
  };
    
  return (
    <View style={styles.container}>
      <TextInput style={{marginTop: 50}} placeholder={'Product'} onChangeText={product => setProduct(product)} value={product}/>
      <TextInput keyboardType='numeric' placeholder={'Amount'} onChangeText={amount => setAmount(amount)} value={amount}/>   
      <Button onPress={saveItem} title='Save' />
      <FlatList data={items} renderItem={({item}) => <Text>{`${item.product}, ${item.amount}`}</Text>} /> 
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 100
 }
});