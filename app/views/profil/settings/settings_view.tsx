import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/profilSlice';
import { useNavigation } from '@react-navigation/native';
import { couleur } from '../../../color';

const SettingsView = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.profil.isLoggedIn);
  const [isDeletePending, setIsDeletePending] = useState(false);
  const navigation = useNavigation();

  const handleDeleteProfile = () => {
    Alert.alert('Confirmation', 'Êtes-vous sûr de vouloir supprimer votre profil ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        onPress: () => {
          setIsDeletePending(true);
        },
      },
    ]);
  };

  const handleCancelDelete = () => {
    setIsDeletePending(false);
    Alert.alert('Annulation', 'Votre demande de suppression a été annulée.');
  };

  const changeLanguage = () => {
    navigation.navigate('Translation' as never);
  };

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Déconnexion',
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Réglages</Text>
      </View>

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

        {isLoggedIn && (
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Se déconnecter</Text>
            <Ionicons name="log-out" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: couleur,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#333', // Couleur sombre pour le titre
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6c757d', // Couleur grise pour les boutons
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
    backgroundColor: '#dc3545', // Couleur rouge sobre pour le bouton de suppression
  },
  logoutButton: {
    backgroundColor: '#007bff', // Couleur bleue sobre pour le bouton de déconnexion
  },
});

export default SettingsView;
