import { View, TextInput, Text, Button, StyleSheet, Modal, Alert, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'

interface InputProps {
  focus?: boolean;
  inputHandler: (data: string) => void;
  modalVisibility: boolean;
  onCancel: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#F2F2F2',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  inputContainer: {
    width: '30%',
    maxWidth: '30%',
    borderWidth: 1,
    borderColor: 'purple',
    padding: 2,
    margin: 10,
  },
  button: {
    width: '30%',
    margin: 4,
  },
  image: {
    width: 100,
    height: 100,
    margin: 4,
  }
});

const Input = ({ focus: initialFocus = false, inputHandler, modalVisibility, onCancel }: InputProps) => {
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(initialFocus)

  const handleConfirm = () => {
    console.log("user has typed: ", text)
    inputHandler(text)
    setText('')
    setIsFocused(false)
  }

  const handleCancel = () => {
    Alert.alert(
      "Cancel",
      "Are you sure you want to cancel?",
      [
        {
          text: "cancel",
          style: "cancel"
        },
        { 
          text: "ok", 
          onPress: () => {
            onCancel();
            setText('');
            setIsFocused(false);
          }
        }
      ]
    );
  };

  return (
    <Modal transparent={true} visible={modalVisibility} animationType='slide'>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Image 
            source={require('../assets/target.png')} 
            alt="target image"
            style={styles.image} 
          />
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }} 
            alt="target image"
            style={styles.image}     
          />
          <TextInput 
            style={styles.inputContainer}
            value={text} 
            onChangeText={(newText) => setText(newText)}
            placeholder='type here'
            autoFocus={initialFocus}
            onSubmitEditing={(e) => {
              e.target.blur()
              setIsFocused(false)
            }}
            onFocus={() => setIsFocused(true)}
          />
          
          {text.length > 0 && isFocused && <Text>{text.length} characters are entered</Text>}
          {text.length >= 3 && !isFocused && <Text>Thank you</Text>}
          {text.length < 3 && !isFocused && <Text>Please type more than 3 characters</Text>}
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button 
                title="Cancel" 
                onPress={handleCancel} 
              />
            </View>
            <View style={styles.button}>
              <Button 
                title="Confirm" 
                onPress={handleConfirm} 
                disabled={text.length < 3}
              />
            </View>          
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Input

