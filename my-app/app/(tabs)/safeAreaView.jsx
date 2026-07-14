import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const safeAreaView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Welcome to My App</Text>
        <Text style={styles.content}>
          This content is safely placed away from notches, status bar, 
          and home indicators thanks to SafeAreaView.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});

export default safeAreaView;