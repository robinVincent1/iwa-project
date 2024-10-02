import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'; // Importer useDispatch et useSelector
import { logout } from '../../store/profilSlice';
import { useNavigation } from '@react-navigation/native';

const SettingsView = () => {
  const dispatch = useDispatch(); // Initialiser le dispatcher
  const isLoggedIn = useSelector(state => state.profil.isLoggedIn); // Sélectionner l'état de connexion
  const [isDeletePending, setIsDeletePending] = useState(false); // État pour gérer si la demande de suppression est en attente
  const navigation = useNavigation();

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

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Déconnexion',
        onPress: () => {
          dispatch(logout()); // Déclencher l'action de déconnexion
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
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

        {isLoggedIn && ( // Afficher le bouton de déconnexion si l'utilisateur est connecté
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
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 40, // Ajustez cette valeur pour rapprocher l'en-tête du haut de la page
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
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
  logoutButton: {
    backgroundColor: '#2196F3', // Couleur bleue pour le bouton de déconnexion
  },
});

export default SettingsView;