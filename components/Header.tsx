import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type appName = {
  name: string
}

const Header = (props: appName) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to {props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,  // Increased border width
    borderColor: 'purple',
    borderRadius: 6,  // Increased border radius
    padding: 6,      // Increased padding
  },
  text: {
    color: 'purple',
    fontSize: 24,     // Increased font size
    fontWeight: '500' // Added medium font weight
  }
});

export default Header