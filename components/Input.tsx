import { View, TextInput, Text, Button, StyleSheet, Modal, Alert } from 'react-native'
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
    backgroundColor: 'white',
    padding: 50,
    borderRadius: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'purple',
    padding: 2,
  },
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
          text: "No",
          style: "cancel"
        },
        { 
          text: "Yes", 
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
            <Button 
              title="Cancel" 
              onPress={handleCancel} 
            />
            <Button 
              title="Confirm" 
              onPress={handleConfirm} 
              disabled={text.length < 3}
            />          
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Input

