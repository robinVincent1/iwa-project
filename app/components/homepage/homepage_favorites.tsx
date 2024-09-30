import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function HomepageFavorites() {
  return (
    <View style={styles.container}>
      <Text>Homepage Favorites</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Ajout de padding pour éviter que le contenu soit collé aux bords
  },
});