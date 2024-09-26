import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Nom de l'App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 90,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'flex-end', // Aligner le contenu en bas
    paddingLeft: 10, // Ajouter un padding à gauche
    paddingBottom: 10, // Ajouter un padding en bas
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});