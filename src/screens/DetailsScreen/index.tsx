import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const DetailsScreen = ({ route }: any) => {
  // Get data passed from navigation
  const { title, description, image } = route.params || {};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>{title || 'Details'}</Text>
      <Text style={styles.description}>
        {description || 'No additional information available.'}
      </Text>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
});
