import { View, TextInput, Text, Button, StyleSheet, Modal} from 'react-native'
import React from 'react'
import { useState } from 'react'

interface InputProps {
  focus?: boolean;
  inputHandler: (data: string) => void;
  modalVisibility: boolean
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'lightgrey',
    padding: 50,
    borderRadius: 10
  }
});

const Input = ({ focus: initialFocus = false, inputHandler, modalVisibility }: InputProps) => {
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(initialFocus)
  function handleConfirm() {
    console.log("user has typed: ", text)
    inputHandler(text)
  }

  return (
    <Modal transparent={true} visible={modalVisibility} animationType='slide'>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <TextInput 
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
          <Button title="confirm" onPress={handleConfirm}></Button>
        </View>
      </View>
    </Modal>
  )
}



export default Input