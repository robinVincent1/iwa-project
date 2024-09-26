import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Emplacement_details({ route, navigation }) {
  const { emplacement } = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [localisation, setLocalisation] = useState(emplacement.localisation);
  const [caracteristique, setCaracteristique] = useState(emplacement.caracteristique);
  const [equipement, setEquipement] = useState(emplacement.equipement);
  const [tarif, setTarif] = useState(emplacement.tarif);
  const [disponible, setDisponible] = useState(emplacement.disponible);

  // Liste de réservations simulée
  const reservations = [
    { id: 1, date: '12/08/2024 - 15/08/2024', statut: 'Confirmée', message_voyageur: 'Merci pour ce bel emplacement !' },
    { id: 2, date: '20/09/2024 - 22/09/2024', statut: 'En attente', message_voyageur: 'Est-ce possible d\'arriver plus tôt ?' },
    { id: 3, date: '05/10/2024 - 10/10/2024', statut: 'Annulée', message_voyageur: 'Je dois annuler pour des raisons personnelles.' },
  ];

  const handleDelete = () => {
    Alert.alert('Confirmation', 'Êtes-vous sûr de vouloir supprimer cet emplacement ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Supprimer', onPress: () => { /* Logique de suppression */ } },
    ]);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Sauvegarder les modifications
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Modifier Emplacement' : 'Détails de l\'Emplacement'}</Text>

      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={localisation}
            onChangeText={setLocalisation}
            placeholder="Localisation"
          />
          <TextInput
            style={styles.input}
            value={caracteristique}
            onChangeText={setCaracteristique}
            placeholder="Caractéristiques"
          />
          <TextInput
            style={styles.input}
            value={equipement}
            onChangeText={setEquipement}
            placeholder="Équipement"
          />
          <TextInput
            style={styles.input}
            value={tarif.toString()}
            onChangeText={text => setTarif(parseFloat(text))}
            placeholder="Tarif"
            keyboardType="numeric"
          />
          <View style={styles.availabilityContainer}>
            <Text style={styles.label}>Disponible:</Text>
            <TouchableOpacity onPress={() => setDisponible(prev => !prev)}>
              <Text style={styles.availabilityText}>{disponible ? 'Oui' : 'Non'}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Localisation:</Text>
            <Text style={styles.detailText}>{localisation}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Caractéristiques:</Text>
            <Text style={styles.detailText}>{caracteristique}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Équipement:</Text>
            <Text style={styles.detailText}>{equipement}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Tarif:</Text>
            <Text style={styles.detailText}>{tarif} €</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Disponible:</Text>
            <Text style={styles.detailText}>{disponible ? 'Oui' : 'Non'}</Text>
          </View>
        </>
      )}

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleSave}>
            <Text style={styles.buttonText}>Sauvegarder</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.button, styles.buttonEdit]} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Modifier</Text>
            <Ionicons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Supprimer</Text>
          <Ionicons name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.reservationTitle}>Réservations liées :</Text>
      {reservations.map(reservation => (
        <View key={reservation.id} style={styles.reservationContainer}>
          <Text style={styles.reservationText}>Date: {reservation.date}</Text>
          <Text style={styles.reservationText}>Statut: {reservation.statut}</Text>
          <Text style={styles.reservationText}>Message: {reservation.message_voyageur}</Text>
        </View>
      ))}
    </ScrollView>
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
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
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  availabilityText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#6200EE',
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    borderRadius: 8,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonEdit: {
    backgroundColor: '#6200EE',
  },
  buttonSave: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  reservationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  reservationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  reservationText: {
    fontSize: 16,
    color: '#333',
  },
});
