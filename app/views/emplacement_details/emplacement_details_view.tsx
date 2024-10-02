import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EmplacementDetailsFacilities from "../../components/emplacement_details/emplacement_details_facilities";
import EmplacementDetailsImages from "../../components/emplacement_details/emplacement_details_images";
import EmplacementDetailsRatings from "../../components/emplacement_details/emplacement_details_ratings";
import EmplacementDetailsDescription from "../../components/emplacement_details/emplacement_details_description";
import EmplacementReservation from "../emplacement_reservation_view"; // Import du composant de réservation
import Reservation from "react-native-calendars/src/agenda/reservation-list/reservation";

export type Avis = {
  id_avis: string;
  id_emplacement: string;
  id_user: string;
  prenom_utilisateur: string; // Ajout du prénom de l'utilisateur
  note: number;
  commentaire: string;
  date_avis: string;
};

export default function EmplacementDetails({ route }) {
  const { emplacement } = route.params; // Passer l'emplacement au lieu du marqueur

  const avis: Avis[] = [
    {
      id_avis: '1',
      id_emplacement: '1',
      id_user: '101',
      prenom_utilisateur: 'Alice', // Prénom ajouté
      note: 5,
      commentaire: 'Superbe emplacement, très proche du centre-ville avec un accès facile à toutes les commodités.',
      date_avis: '2024-09-25',
    },
    {
      id_avis: '2',
      id_emplacement: '1',
      id_user: '102',
      prenom_utilisateur: 'Bob',
      note: 4,
      commentaire: 'Très bien situé, mais un peu bruyant la nuit.',
      date_avis: '2024-09-20',
    },
  ];

  const reservations : Reservation[] = [
    {
      id_reservation: '1',
      id_user: 'sdfsdf',
      date_debut: '2024-10-10',
      date_fin: '2024-10-15',
      statut: 'confirmée',
      message_voyageur: "jfhd",
      emplacement: emplacement,
    },
    {
      id_reservation: '2',
      id_user: 'sdfsdf',
      date_debut: '2024-10-20',
      date_fin: '2024-10-25',
      statut: 'confirmée',
      message_voyageur: "jfhd",
      emplacement: emplacement,
    },
  ]; // Exemple de réservations existantes

  if (!emplacement) {
    console.log("Emplacement non trouvé");
    return <Text>Erreur : Emplacement non trouvé</Text>; // Pour voir s'il est vraiment passé
  }

  function Separateur() {
    return <View style={styles.separateur} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {/* Section des images */}
      <EmplacementDetailsImages photos={emplacement.photos} />

      {/* Description de l'emplacement */}
      <EmplacementDetailsDescription emplacement={emplacement} />

      <Separateur />

      {/* Équipements */}
      <View style={styles.facilitiesContainer}>
        <Text style={styles.sectionTitle}>Équipements</Text>
        <EmplacementDetailsFacilities equipment={emplacement.equipement} />
      </View>

      <Separateur />

      {/* Évaluations */}
      <View style={styles.ratingsContainer}>
        <Text style={styles.sectionTitle}>Évaluations</Text>
        <EmplacementDetailsRatings avis={avis} rating={emplacement.moyenneAvis} />
      </View>

      <Separateur />

      {/* Calendrier de réservation */}
      <View style={styles.reservationContainer}>
        <Text style={styles.sectionTitle}>Réservez cet emplacement</Text>
        {/* Intégration du composant de calendrier ici */}
        <EmplacementReservation reservations={reservations} />
      </View>

      {/* Bouton de réservation */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.text_button}>Confirmer la réservation</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 10, // Ajout d'un peu de padding horizontal
  },
  separateur: {
    borderBottomColor: "gray",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "95%", // Ajusté à la taille du conteneur parent
    marginVertical: 10,
  },
  facilitiesContainer: {
    width: "95%",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ratingsContainer: {
    width: "95%",
    marginBottom: 15,
  },
  reservationContainer: {
    width: "95%",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "95%",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text_button: {
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
