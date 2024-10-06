import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Rating } from '@kolking/react-native-rating';
import { Button } from 'react-native-paper'; // Utilisation de Button de react-native-paper

type ReservationParams = {
  reservation: {
    date: string;
    statut: string;
    message_voyageur: string;
  };
};

export default function EmplacementReservationDetails() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: ReservationParams }, 'params'>>();
  const { reservation } = route.params;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner une note.');
    } else {
      Alert.alert('Soumission réussie', `Votre avis a été soumis avec la note de ${rating} étoiles.`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#37474F" />
        </TouchableOpacity>
        <Text style={styles.title}>Détails de la Réservation</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{reservation.date}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Statut:</Text>
        <Text style={styles.value}>{reservation.statut}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Message:</Text>
        <Text style={styles.value}>{reservation.message_voyageur}</Text>
      </View>

      <View style={styles.reviewContainer}>
        <Text style={styles.reviewTitle}>Laisser un avis</Text>
        <Rating rating={rating} onChange={setRating} max={5} iconWidth={30} iconHeight={30} />
        <TextInput
          style={styles.commentInput}
          placeholder="Votre commentaire"
          value={comment}
          onChangeText={setComment}
          placeholderTextColor="#B0BEC5"
        />
        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
          Soumettre
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#37474F",
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796B',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  reviewContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 3,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  commentInput: {
    height: 60,
    borderColor: '#B0BEC5',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#00796B',
    borderRadius: 5,
  },
});
