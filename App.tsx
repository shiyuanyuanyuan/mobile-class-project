import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import Header from './components/Header'
import React, { useState } from 'react'
import Input from './components/Input'

export default function App() {
  const appName = 'my app'
  const [receivetText, setReceiveText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  function handleInputData(data: string){
    console.log("app user type: ", data)
    setReceiveText(data)
    setModalVisible(false)
  }
  function handleModal(){
    setModalVisible(true)
  }

  function handleModalDismiss() {
    console.log("app user cancel")
    setReceiveText('')
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Header name={appName} />
        <StatusBar style="auto" />
        <Input 
          focus={true} 
          inputHandler={handleInputData} 
          modalVisibility={modalVisible}
          onCancel={handleModalDismiss}
        />
        <Button title="Add a goal" onPress={handleModal}></Button>
      </View>
      <View style={styles.backContainer}>
        <Text style={styles.goalText}>{receivetText}</Text>
      </View>      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backContainer: {
    flex: 4,
    backgroundColor: "#E6E6FA",
    alignItems: 'center',
    paddingTop: 20,
  },
  goalText: {
    color: 'blue',
    fontSize: 18,
  },

});
