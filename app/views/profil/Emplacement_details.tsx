import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Emplacement_details({ route }) {
  const { emplacement } = route.params;
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [localisation, setLocalisation] = useState(emplacement.localisation);
  const [caracteristique, setCaracteristique] = useState(emplacement.caracteristique);
  const [equipement, setEquipement] = useState(emplacement.equipement);
  const [tarif, setTarif] = useState(emplacement.tarif);
  const [disponible, setDisponible] = useState(emplacement.disponible);

  // Liste d'avis simulée
  const avisList = [
    { id_avis: 1, note: 4, commentaire: 'Super emplacement, calme et bien équipé.', date_avis: '15/08/2024' },
    { id_avis: 2, note: 5, commentaire: 'Parfait pour un week-end en famille.', date_avis: '18/09/2024' },
    { id_avis: 3, note: 3, commentaire: 'Emplacement correct, mais manque d\'ombre.', date_avis: '25/09/2024' },
  ];

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<Ionicons key={i} name="star" size={20} color="gold" />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={20} color="gray" />);
      }
    }
    return stars;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{isEditing ? 'Modifier Emplacement' : 'Détails de l\'Emplacement'}</Text>
      </View>

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

      <Text style={styles.avisTitle}>Avis :</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avisContainer}>
        {avisList.map(avis => (
          <View key={avis.id_avis} style={styles.avisCard}>
            <View style={styles.starContainer}>
              {renderStars(avis.note)}
            </View>
            <Text style={styles.avisText}>Commentaire: {avis.commentaire}</Text>
            <Text style={styles.avisText}>Date: {avis.date_avis}</Text>
          </View>
        ))}
      </ScrollView>
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
    color: '#333',
    flex: 1,
    textAlign: 'center',
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
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSave: {
    backgroundColor: '#4CAF50',
  },
  buttonEdit: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
  },
  reservationText: {
    fontSize: 16,
    color: '#333',
  },
  avisTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  avisContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avisCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    elevation: 1,
    width: 250, // Largeur de la carte d'avis
  },
  avisText: {
    fontSize: 14,
    color: '#333',
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});