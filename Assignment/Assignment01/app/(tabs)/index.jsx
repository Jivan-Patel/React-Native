import { View, Text, StyleSheet, Button } from 'react-native'
import { router } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome to my App</Text>
      <Button
        title='Go to students'
        onPress={() => router.push('(tabs)/Student')}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#f5f5f5",
    gap: 25
  }
})

export default Home