import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import Header from './components/Header'
import React, { useState } from 'react'

export default function App() {
  const appName = 'my app'
  const [text, setText] = useState('')
  return (
    <View style={styles.container}>
      <Header name={appName} />
      <StatusBar style="auto" />
      <TextInput 
        value = {text} 
        onChangeText={(newText) => setText(newText)}
        placeholder='type here'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
