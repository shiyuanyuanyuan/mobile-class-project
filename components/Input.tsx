import { View, TextInput} from 'react-native'
import React from 'react'
import { useState } from 'react'

const Input = () => {
  const [text, setText] = useState('')
  return (
    <View>
    <TextInput 
      value = {text} 
      onChangeText={(newText) => setText(newText)}
      placeholder='type here'/>
    </View>
  )
}

export default Input