import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import Header from './components/Header'
import React, { useState } from 'react'
import Input from './components/Input'

export default function App() {
  const appName = 'my app'
  const [receivetText, setReceiveText] = useState('')
  function handleInputData(data: string){
    console.log("app user type: ", data)
    setReceiveText(data)
  }

  return (
    <View style={styles.container}>
      <Header name={appName} />
      <StatusBar style="auto" />
      <Input focus={true} inputHandler={handleInputData} />
      <Text>{receivetText}</Text>
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
