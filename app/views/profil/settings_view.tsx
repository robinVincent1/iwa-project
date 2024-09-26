import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsView = () => {
  const [isDeletePending, setIsDeletePending] = useState(false); // État pour gérer si la demande de suppression est en attente

  const handleDeleteProfile = () => {
    Alert.alert('Confirmation', 'Êtes-vous sûr de vouloir supprimer votre profil ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        onPress: () => {
          setIsDeletePending(true); // Mettre à jour l'état pour indiquer que la demande est en attente
        },
      },
    ]);
  };

  const handleCancelDelete = () => {
    setIsDeletePending(false); // Annuler la demande de suppression
    Alert.alert('Annulation', 'Votre demande de suppression a été annulée.');
  };

  const changeLanguage = () => {
    // Logique pour changer la langue
    Alert.alert('Langue', 'Fonctionnalité non implémentée.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réglages</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={changeLanguage}>
          <Text style={styles.buttonText}>Modifier la langue</Text>
          <Ionicons name="language" size={20} color="#fff" />
        </TouchableOpacity>

        {isDeletePending ? (
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleCancelDelete}>
            <Text style={styles.buttonText}>Annuler la demande de suppression</Text>
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteProfile}>
            <Text style={styles.buttonText}>Supprimer mon profil</Text>
            <Ionicons name="trash" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6200EE',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#f44336', // Couleur rouge pour le bouton de suppression
  },
});

export default SettingsView;
