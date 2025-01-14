import { View, TextInput, Text} from 'react-native'
import React from 'react'
import { useState } from 'react'
interface InputProps {
  focus?: boolean;
}

const Input = ({ focus: initialFocus = false }: InputProps) => {
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(initialFocus)

  return (
    <View>
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
    </View>
  )
}

export default Input