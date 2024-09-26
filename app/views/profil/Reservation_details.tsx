import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Reservation_details({ route, navigation }) {
  const { reservation } = route.params;

  const handleCancel = () => {
    Alert.alert('Confirmation', 'Êtes-vous sûr de vouloir annuler cette réservation ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Confirmer', onPress: () => { /* Logique pour annuler la réservation */ } },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la Réservation</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.detailText}>{reservation.date_debut} / {reservation.date_fin} </Text>
      </View>
      
      <View style={styles.detailRow}>
        <Text style={styles.label}>Statut:</Text>
        <Text style={styles.detailText}>{reservation.statut}</Text>
      </View>
      
      <View style={styles.detailRow}>
        <Text style={styles.label}>Message:</Text>
        <Text style={styles.detailText}>{reservation.message_voyageur}</Text>
      </View>

      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
        <Text style={styles.buttonText}>Annuler</Text>
        <Ionicons name="close-circle" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f5',
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  detailText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
});
