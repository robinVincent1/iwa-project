import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Reservation_details({ route, navigation }) {
  const { reservation } = route.params;

  const currentDate = new Date(); // Date actuelle
  const endDate = new Date(reservation.date_fin); // Date de fin de la réservation

  const [showReviewForm, setShowReviewForm] = useState(false); // État pour gérer l'affichage du formulaire
  const [review, setReview] = useState({ note: '', commentaire: '' }); // État pour gérer l'avis

  const handleCancel = () => {
    Alert.alert('Confirmation', 'Êtes-vous sûr de vouloir annuler cette réservation ?', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Confirmer', onPress: () => { /* Logique pour annuler la réservation */ } },
    ]);
  };

  const handleGiveReview = () => {
    setShowReviewForm(true); // Afficher le formulaire d'avis
  };

  const handleSubmitReview = () => {
    // Logique pour soumettre l'avis (API ou stockage local par exemple)
    Alert.alert('Avis envoyé', 'Merci pour votre avis.');
    setShowReviewForm(false); // Masquer le formulaire après soumission
    Keyboard.dismiss(); // Fermer le clavier
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.avoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Détails de la Réservation</Text>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.detailText}>{reservation.date_debut} / {reservation.date_fin}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Statut:</Text>
            <Text style={styles.detailText}>{reservation.statut}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Message:</Text>
            <Text style={styles.detailText}>{reservation.message_voyageur}</Text>
          </View>

          {endDate < currentDate ? (
            // Si la date de fin est passée, afficher le bouton pour donner un avis
            <TouchableOpacity style={[styles.button, styles.reviewButton]} onPress={handleGiveReview}>
              <Text style={styles.buttonText}>Donner un avis</Text>
              <Ionicons name="star" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            // Sinon, afficher le bouton pour annuler la réservation
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Annuler</Text>
              <Ionicons name="close-circle" size={20} color="#fff" />
            </TouchableOpacity>
          )}

          {/* Afficher le formulaire d'avis si l'utilisateur a cliqué sur "Donner un avis" */}
          {showReviewForm && (
            <View style={styles.reviewForm}>
              <Text style={styles.formTitle}>Donner un avis</Text>

              <TextInput
                style={styles.input}
                placeholder="Note (sur 5)"
                keyboardType="numeric"
                value={review.note}
                onChangeText={(text) => setReview({ ...review, note: text })}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />

              <TextInput
                style={styles.input}
                placeholder="Commentaire"
                multiline
                value={review.commentaire}
                onChangeText={(text) => setReview({ ...review, commentaire: text })}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />

              <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmitReview}>
                <Text style={styles.buttonText}>Soumettre</Text>
                <Ionicons name="send" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
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
  reviewButton: {
    backgroundColor: '#4CAF50',
  },
  submitButton: {
    backgroundColor: '#6200EE',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
  },
  reviewForm: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});
