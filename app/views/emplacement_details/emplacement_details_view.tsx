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

export type Avis = {
    id_avis: string;
    id_emplacement: string;
    id_user: string;
    prenom_utilisateur: string;  // Ajout du prénom de l'utilisateur
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
      prenom_utilisateur: 'Alice',  // Prénom ajouté
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



      {/* Bouton de réservation */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.text_button}>Réserver</Text>
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
    imageContainer: {
      width: "100%",
      height: 200,
      overflow: "hidden",
      borderRadius: 10,
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
      resizeMode: "cover",
    },
    descriptionContainer: {
      padding: 10, // Réduction du padding
      backgroundColor: "#f8f8f8",
      borderRadius: 10,
      width: "95%", // Plus proche du bord pour économiser de l'espace
      marginBottom: 15, // Réduction de la marge en bas
    },
    title: {
      fontSize: 22, // Réduction légère de la taille
      fontWeight: "bold",
      marginBottom: 5,
    },
    description: {
      fontSize: 14, // Réduction légère de la taille de police
      color: "#333",
    },
    separateur: {
      borderBottomColor: "gray",
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: "95%", // Ajusté à la taille du conteneur parent
      marginVertical: 10,
    },
    facilitiesContainer: {
      width: "95%", // Réduction pour correspondre aux autres sections
      marginBottom: 15, // Réduction de la marge
    },
    sectionTitle: {
      fontSize: 18, // Taille de police réduite
      fontWeight: "bold",
      marginBottom: 8, // Réduction de la marge en bas
    },
    ratingsContainer: {
      width: "95%", // Ajusté à la taille du conteneur parent
      marginBottom: 15, // Réduction de la marge en bas
    },
    ratingsText: {
      fontSize: 16,
      color: "#555",
    },
    buttonContainer: {
      width: "95%", // Ajusté à la taille du conteneur parent
      marginBottom: 20,
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10, // Réduction de la hauteur du bouton
      borderRadius: 4,
      elevation: 3,
      backgroundColor: "black",
    },
    text_button: {
      fontSize: 15, // Réduction légère de la taille de police
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  });
  