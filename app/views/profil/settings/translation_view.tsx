import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TranslationView() {
  const [selectedLanguage, setSelectedLanguage] = useState('Français');

  const languages = ['Français', 'Anglais'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez une langue</Text>
      {languages.map((language) => (
        <TouchableOpacity
          key={language}
          style={styles.languageOption}
          onPress={() => setSelectedLanguage(language)}
        >
          <Text style={styles.languageText}>{language}</Text>
          {selectedLanguage === language && (
            <Ionicons name="checkmark" size={24} color="green" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#37474F',
    marginBottom: 20,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#B0BEC5',
  },
  languageText: {
    fontSize: 18,
    color: '#333',
  },
});