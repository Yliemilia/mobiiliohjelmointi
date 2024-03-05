import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, TextInput, View, Button } from "react-native";
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove,set } from 'firebase/database';

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
      const newItemRef = push(ref(database, 'items/'));
      const newItemKey = newItemRef.key;
      const newItem = { id: newItemKey, product, amount };
      setProduct("");
      setAmount("");
      return set(newItemRef, newItem);
    };

  const deleteItem = (itemId) => {
    console.log("Deleting item with ID:", itemId);
    remove(ref(database, `items/${itemId}`));
  };
    
  return (
    <View style={styles.container}>
      <TextInput style={styles.textinput} placeholder={'Product'} onChangeText={product => setProduct(product)} value={product}/>
      <TextInput style={styles.textinput} placeholder={'Amount'} onChangeText={amount => setAmount(amount)} value={amount}/>   
      <Button onPress={saveItem} title='Save' />
      <Text style={{marginTop: 30, fontSize: 20,marginBottom: 10}}>Shopping list</Text>
      <FlatList data={items} renderItem={({item}) => 
      <View style={styles.listcontainer}><Text style={{fontSize: 17, padding: 5}}>{item.product}, {item.amount}</Text>
      <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> Delete</Text></View>} /> 
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
 },
 textinput: {
    margin: 5,
    fontSize: 18, 
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1
 },
 listcontainer: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center'
 },
});