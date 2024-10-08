import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { renderRating } from "../../utils/renderRating";
import { couleur } from "../../color";

// Définition des types User, Emplacement et Réservation
export type User = {
  id_user: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  mot_de_passe: string;
  role: string;
  photo?: string;
};

export type Emplacement = {
  id_emplacement: string;
  localisation: string;
  caracteristique: string;
  equipement: string[];
  tarif: number;
  disponible: boolean;
  moyenneAvis: number;
  photos: string[]; // Liste d'URLs de photos
  coordonnees: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
    name: string;
    rating: number;
  };
};

export type Reservation = {
  id_reservation: string;
  id_user: string;
  date_debut: string;
  date_fin: string;
  statut: string;
  message_voyageur: string;
  emplacement: Emplacement;
};

export type Avis = {
  id_avis: string;
  id_emplacement: string;
  note: number;
  commentaire: string;
  date_avis: string;
};

export default function ProfilView() {
  const navigation = useNavigation();

  const fakeUser: User = {
    id_user: "1",
    prenom: "Robin",
    nom: "Vincent",
    email: "robin@gmail.com",
    telephone: "02896278678",
    mot_de_passe: "lkjqscjd",
    role: "voyageur",
    photo: "",
  };

  const [userInfo, setUserInfo] = useState<User>(fakeUser);
  const [isEditing, setIsEditing] = useState(false);
  const [emplacements, setEmplacements] = useState<Emplacement[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    loadUser();
    loadEmplacements();
  }, []);

  useEffect(() => {
    if (emplacements.length > 0) {
      loadReservations(emplacements);
    }
  }, [emplacements]);

  const loadUser = async () => {
    setUserInfo(fakeUser);
  };

  const loadEmplacements = async () => {
    const fakeEmplacements: Emplacement[] = [
      {
        id_emplacement: "1",
        localisation: "Montpellier",
        caracteristique: "Proche du centre-ville",
        equipement: ["Wi-Fi", "Piscine"],
        tarif: 50,
        disponible: true,
        moyenneAvis: 4.7,
        photos: [
          "https://example.com/photo1.jpg",
          "https://example.com/photo2.jpg",
        ],
        coordonnees: {
          latitude: 43.6,
          longitude: 3.8833,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          name: "Montpellier Centre",
          rating: 4.7,
        },
      },
      {
        id_emplacement: "2",
        localisation: "Montpellier",
        caracteristique: "Proche des plages",
        equipement: ["Parking", "Animaux acceptés"],
        tarif: 80,
        disponible: false,
        moyenneAvis: 3.8,
        photos: [
          "https://example.com/photo3.jpg",
          "https://example.com/photo4.jpg",
        ],
        coordonnees: {
          latitude: 43.58,
          longitude: 3.9,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          name: "Montpellier Plages",
          rating: 3.8,
        },
      }]

    const fakeAvis: Avis[] = [
      {
        id_avis: "1",
        id_emplacement: "1",
        note: 4,
        commentaire: "Super séjour!",
        date_avis: "2024-09-01",
      },
      {
        id_avis: "2",
        id_emplacement: "1",
        note: 5,
        commentaire: "Incroyable!",
        date_avis: "2024-09-02",
      },
      {
        id_avis: "3",
        id_emplacement: "2",
        note: 3,
        commentaire: "Pas mal.",
        date_avis: "2024-09-03",
      },
    ];

    setEmplacements(fakeEmplacements);

    // Calculer la moyenne des avis
    const emplacementsAvecMoyenne = fakeEmplacements.map((emplacement) => {
      const avisPourEmplacement = fakeAvis.filter(
        (avis) => avis.id_emplacement === emplacement.id_emplacement
      );
      const moyenne =
        avisPourEmplacement.reduce((sum, avis) => sum + avis.note, 0) /
        (avisPourEmplacement.length || 1);
      return { ...emplacement, moyenneAvis: moyenne };
    });

    setEmplacements(emplacementsAvecMoyenne);
  };

  const loadReservations = async (loadedEmplacements: Emplacement[]) => {
    const fakeReservations: Reservation[] = [
      {
        id_reservation: "1",
        date_debut: "2024-09-01",
        date_fin: "2024-09-05",
        statut: "Confirmée",
        message_voyageur: "Excité pour le séjour!",
        emplacement: loadedEmplacements[0],
      },
      {
        id_reservation: "2",
        date_debut: "2024-09-10",
        date_fin: "2024-09-15",
        statut: "En attente",
        message_voyageur: "Vivement ce séjour!",
        emplacement: loadedEmplacements[1],
      },
    ];
    setReservations(fakeReservations);
  };

  const handleAddEmplacement = () => {
    navigation.navigate("Add_emplacement");
    // Logique pour ajouter un emplacement
  }

  const saveUser = async () => {
    Alert.alert("Succès", "Informations sauvegardées avec succès.");
    setIsEditing(false);
  };

  const handleChange = (field: keyof User, value: string) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const handleSave = () => {
    saveUser();
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission requise",
        "Vous devez autoriser l'accès à la galerie."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserInfo({ ...userInfo, photo: result.assets[0].uri });
    }
  };

  const renderProfileImage = () => {
    if (userInfo.photo) {
      return (
        <Image source={{ uri: userInfo.photo }} style={styles.profileImage} />
      );
    } else {
      const initials = `${userInfo.prenom.charAt(0)}${userInfo.nom.charAt(
        0
      )}`.toUpperCase();
      return (
        <View style={styles.defaultImageContainer}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
      );
    }
  };

  const addEmplacement = () => {
    // Logique pour ajouter un emplacement
    Alert.alert("Ajouter Emplacement", "Fonctionnalité non implémentée.");
  };

  const deleteEmplacement = (id: string) => {
    // Logique pour supprimer un emplacement
    Alert.alert(
      "Supprimer Emplacement",
      `Êtes-vous sûr de vouloir supprimer l'emplacement ${id}?`
    );
  };

  const addReservation = () => {
    // Logique pour ajouter une réservation
    Alert.alert("Ajouter Réservation", "Fonctionnalité non implémentée.");
  };

  const deleteReservation = (id: string) => {
    // Logique pour supprimer une réservation
    Alert.alert(
      "Supprimer Réservation",
      `Êtes-vous sûr de vouloir supprimer la réservation ${id}?`
    );
  };

  const navigateToEmplacementDetails = (emplacement: Emplacement) => {
    navigation.navigate("Emplacement_detail", { emplacement });
  };

  const navigateToReservationDetails = (reservation: Reservation) => {
    navigation.navigate("Reservation_detail", { reservation });
  };

  const navigateToSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={navigateToSettings}
            style={styles.settingsButton}
          >
            <Ionicons name="settings" size={24} color="#37474F" />
            {/* Couleur du bouton réglages */}
          </TouchableOpacity>
        </View>
        <View style={styles.profileImageContainer}>
          {renderProfileImage()}
          {renderRating(4.5, false)}
          {isEditing && (
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Choisir une photo</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Profil</Text>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <MaterialCommunityIcons
                  name="pencil-off"
                  size={24}
                  color="#00796B"
                />
              ) : (
                <MaterialCommunityIcons
                  name="pencil"
                  size={24}
                  color="#00796B"
                />
              )}
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Prénom"
                value={userInfo.prenom}
                onChangeText={(value) => handleChange("prenom", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Nom"
                value={userInfo.nom}
                onChangeText={(value) => handleChange("nom", value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={userInfo.email}
                onChangeText={(value) => handleChange("email", value)}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Téléphone"
                value={userInfo.telephone}
                onChangeText={(value) => handleChange("telephone", value)}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={userInfo.mot_de_passe}
                onChangeText={(value) => handleChange("mot_de_passe", value)}
                secureTextEntry
              />
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Sauvegarder</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.infoText}>
                Prénom: <Text style={styles.infoValue}>{userInfo.prenom}</Text>
              </Text>
              <Text style={styles.infoText}>
                Nom: <Text style={styles.infoValue}>{userInfo.nom}</Text>
              </Text>
              <Text style={styles.infoText}>
                Email: <Text style={styles.infoValue}>{userInfo.email}</Text>
              </Text>
              <Text style={styles.infoText}>
                Téléphone:{" "}
                <Text style={styles.infoValue}>{userInfo.telephone}</Text>
              </Text>
              <Text style={styles.infoText}>
                Rôle: <Text style={styles.infoValue}>{userInfo.role}</Text>
              </Text>
            </>
          )}
        </View>

        <View style={styles.emplacementContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mes Emplacements</Text>
            <Ionicons
              name="home"
              size={20}
              color="#37474F"
              style={styles.iconRight}
            />
          </View>
          {emplacements.map((emplacement) => (
            <TouchableOpacity
              key={emplacement.id_emplacement}
              onPress={() => navigateToEmplacementDetails(emplacement)}
            >
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  {emplacement.localisation}{" "}
                  {renderRating(emplacement.moyenneAvis, false)}
                </Text>
                <Text style={styles.cardText}>
                  Caractéristiques: {emplacement.caracteristique}
                </Text>
                <Text style={styles.cardText}>
                  Équipement: {emplacement.equipement}
                </Text>
                <Text style={styles.cardText}>
                  Tarif: {emplacement.tarif} €
                </Text>
                <Text style={styles.cardText}>
                  Disponible: {emplacement.disponible ? "Oui" : "Non"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={handleAddEmplacement}>
            <Ionicons name="add-circle" size={40} color="#00796B" />
          </TouchableOpacity>
        </View>


        <View style={styles.reservationContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mes Réservations</Text>
            <Ionicons
              name="calendar"
              size={20}
              color="#37474F"
              style={styles.iconRight}
            />
          </View>
          {reservations.map((reservation) => (
            <TouchableOpacity
              key={reservation.id_reservation}
              onPress={() => navigateToReservationDetails(reservation)}
            >
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  {reservation.emplacement.localisation}{" "}
                  {renderRating(reservation.emplacement.moyenneAvis, false)}
                </Text>
                <Text style={styles.cardText}>
                  {reservation.date_debut} / {reservation.date_fin}
                </Text>
                <Text style={styles.cardText}>
                  Statut: {reservation.statut}
                </Text>
                <Text style={styles.cardText}>
                  Message: {reservation.message_voyageur}
                </Text>
                <Text style={styles.cardText}>
                  Caractéristique: {reservation.emplacement.caracteristique}
                </Text>
                <Text style={styles.cardText}>
                  Équipement: {reservation.emplacement.equipement}
                </Text>
                <Text style={styles.cardText}>
                  Tarif: {reservation.emplacement.tarif} €
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: couleur, // Vert doux pour l'arrière-plan
  },
  scrollContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Pour que le bouton réglages soit à droite
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  settingsButton: {
    padding: 10,
    borderRadius: 10,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#FF0000",
  },
  defaultImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#00796B", 
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  header: {
    flexDirection: "row", // Ajoute cette ligne pour que les éléments soient en ligne
    justifyContent: "space-between", // Cela maintiendra le texte et le bouton d'édition aux extrémités
    alignItems: "center", // Pour centrer verticalement
  },  
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#37474F", // Gris foncé
    justifyContent: "space-between",
  },
  input: {
    height: 44,
    borderColor: "#B0BEC5", // Gris doux
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
    fontSize: 16,
  },
  button: {
    padding: 12,
    backgroundColor: "#37474F", // Vert montagne élégant
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  infoText: {
    fontSize: 16,
    color: "#546E7A", // Gris bleuté pour le texte d'information
    marginVertical: 4,
  },
  infoValue: {
    fontWeight: "bold",
    color: "#37474F", // Gris foncé pour la valeur d'information
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#37474F", // Gris foncé pour le titre de la carte
  },
  cardText: {
    fontSize: 14,
    color: "#546E7A", // Gris bleuté pour le texte de la carte
  },
  addButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#37474F",
  },
  iconRight: {
    marginLeft: 10,
  },
  editProfileButton: {
    padding: 10,
  },
});
