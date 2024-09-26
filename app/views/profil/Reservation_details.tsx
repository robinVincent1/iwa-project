import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Reservation_details({ route, navigation }) {
  const { reservation } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réservation</Text>
      <Text>Date: {reservation.date_debut_date_fin}</Text>
      <Text>Statut: {reservation.statut}</Text>
      <Text>Message: {reservation.message_voyageur}</Text>

      <Button title="Modifier" onPress={() => { /* Fonction pour modifier */ }} />
      <Button title="Annuler" color="red" onPress={() => { /* Fonction pour annuler */ }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
