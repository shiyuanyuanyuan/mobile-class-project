import { View, Text } from 'react-native'
import React from 'react'

type appName = {
  name: string
}
const Header = (props: appName) => {
  return (
    <View>
      <Text>Welcome to {props.name}</Text>
    </View>
  )
}

export default Header