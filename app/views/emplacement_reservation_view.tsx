import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars'; // Importer le composant calendrier
import moment from 'moment'; // Moment.js pour faciliter la gestion des dates
import { Reservation } from './profil/profile_view';

interface EmplacementReservationProps {
  reservations: Reservation[]; // Les réservations existantes
}

export default function EmplacementReservation({ reservations }: EmplacementReservationProps) {
  const [markedDates, setMarkedDates] = useState({}); // Stocker les dates marquées
  const [selectedRange, setSelectedRange] = useState<{ startDate: string | null, endDate: string | null }>({ startDate: null, endDate: null }); // Stocker la plage de dates sélectionnées

  useEffect(() => {
    const disabledDates = {};

    reservations.forEach(reservation => {
      // Boucler à travers chaque réservation et marquer les dates entre `date_debut` et `date_fin`
      let current = moment(reservation.date_debut);
      const end = moment(reservation.date_fin);

      while (current <= end) {
        const formattedDate = current.format('YYYY-MM-DD');
        disabledDates[formattedDate] = {
          disabled: true,
          disableTouchEvent: true,
          color: '#d3d3d3', // Couleur grise pour les dates indisponibles
          textColor: 'gray'
        };
        current = current.add(1, 'day'); // Passer au jour suivant
      }
    });

    setMarkedDates(disabledDates);
  }, [reservations]);

  const handleDayPress = (day) => {
    const { dateString } = day;

    // Si aucune date n'est sélectionnée, définir la date de début
    if (!selectedRange.startDate) {
      setSelectedRange({ startDate: dateString, endDate: null });
      setMarkedDates({
        ...markedDates,
        [dateString]: { selected: true, startingDay: true, color: 'green', textColor: 'white' } // Sélection en vert
      });
    } 
    // Si la date de début est sélectionnée et aucune date de fin, définir la date de fin
    else if (selectedRange.startDate && !selectedRange.endDate) {
      const startDate = moment(selectedRange.startDate);
      const endDate = moment(dateString);

      // Si la date de fin est avant la date de début, alerter l'utilisateur
      if (endDate.isBefore(startDate)) {
        Alert.alert('Erreur', 'La date de fin ne peut pas être avant la date de début');
      } else {
        // Marquer les dates entre la date de début et de fin
        const range = {};
        let current = startDate;
        while (current <= endDate) {
          const formattedDate = current.format('YYYY-MM-DD');
          range[formattedDate] = {
            selected: true,
            color: 'green', // Sélection en vert
            textColor: 'white'
          };
          current = current.add(1, 'day');
        }

        setSelectedRange({ startDate: selectedRange.startDate, endDate: dateString });
        setMarkedDates({
          ...markedDates,
          ...range,
          [selectedRange.startDate]: { selected: true, startingDay: true, color: 'green', textColor: 'white' },
          [dateString]: { selected: true, endingDay: true, color: 'green', textColor: 'white' }
        });
      }
    } 
    // Réinitialiser si la plage est déjà sélectionnée
    else {
      setSelectedRange({ startDate: dateString, endDate: null });
      setMarkedDates({
        ...markedDates,
        [dateString]: { selected: true, startingDay: true, color: 'green', textColor: 'white' } // Sélection en vert
      });
    }
  };

  const handleReservationConfirmation = () => {
    const { startDate, endDate } = selectedRange;
    if (startDate && endDate) {
      console.log('Dates de réservation :', startDate, endDate);
      // Logique pour envoyer la réservation à l'API
      Alert.alert('Réservation confirmée', `Vous avez réservé du ${startDate} au ${endDate}.`);
    } else {
      Alert.alert('Erreur', 'Veuillez sélectionner une plage de dates.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choisissez vos dates</Text>

      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates} // Dates marquées
        markingType={'period'} // Permet de marquer une plage de dates
        hideExtraDays={true}
        minDate={moment().format('YYYY-MM-DD')} // Empêcher la sélection de dates passées
        enableSwipeMonths={true}
      />

      {/* Bouton de réservation */}
      <Pressable style={styles.button} onPress={handleReservationConfirmation}>
        <Text style={styles.text_button}>Confirmer la réservation</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 20,
  },
  text_button: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});
