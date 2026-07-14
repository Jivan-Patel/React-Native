import React from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';

const viewScrollview = () => {
  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to My App</Text>
        
        <Text style={styles.paragraph}>
          This is a long content that needs scrolling. 
          ScrollView makes it easy to view all the content.
        </Text>

        <Image 
          source={{ uri: 'https://picsum.photos/300/200' }} 
          style={styles.image} 
        />

        <Text style={styles.paragraph}>
          You can put Text, Images, Buttons, and many other components inside ScrollView.
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to My App</Text>
        
        <Text style={styles.paragraph}>
          This is a long content that needs scrolling. 
          ScrollView makes it easy to view all the content.
        </Text>

        <Image 
          source={{ uri: 'https://picsum.photos/300/200' }} 
          style={styles.image} 
        />

        <Text style={styles.paragraph}>
          You can put Text, Images, Buttons, and many other components inside ScrollView.
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to My App</Text>
        
        <Text style={styles.paragraph}>
          This is a long content that needs scrolling. 
          ScrollView makes it easy to view all the content.
        </Text>

        <Image 
          source={{ uri: 'https://picsum.photos/300/200' }} 
          style={styles.image} 
        />

        <Text style={styles.paragraph}>
          You can put Text, Images, Buttons, and many other components inside ScrollView.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
});

export default viewScrollview;