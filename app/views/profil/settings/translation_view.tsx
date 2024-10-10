// translation_view.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

interface Language {
  code: string;
  label: string;
}

export default function TranslationView() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('fr');

  const languages: Language[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'Anglais' }
  ];

  const changeLanguage = (code: string) => {
    setSelectedLanguage(code);
    i18n.changeLanguage(code);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('choose_language')}</Text>
      {languages.map((language) => (
        <TouchableOpacity
          key={language.code}
          style={styles.languageOption}
          onPress={() => changeLanguage(language.code)}
        >
          <Text style={styles.languageText}>{language.label}</Text>
          {selectedLanguage === language.code && (
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