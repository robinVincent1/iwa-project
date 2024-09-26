import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


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
  equipement: string;
  tarif: number;
  disponible: boolean;
};

export type Reservation = {
  id_reservation: string;
  date_debut: string;
  date_fin: string;
  statut: string;
  message_voyageur: string;
  emplacement: Emplacement;  
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
    photo: '',
  };

  const [userInfo, setUserInfo] = useState<User>(fakeUser);
  const [isEditing, setIsEditing] = useState(false);
  const [emplacements, setEmplacements] = useState<Emplacement[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    loadUser();
    loadEmplacements();
    loadReservations();
  }, []);

  const loadUser = async () => {
    setUserInfo(fakeUser);
  };

  const loadEmplacements = async () => {
    const fakeEmplacements: Emplacement[] = [
      { id_emplacement: '1', localisation: 'Plage', caracteristique: 'Vue sur la mer', equipement: 'Chaises longues', tarif: 50, disponible: true },
      { id_emplacement: '2', localisation: 'Montagne', caracteristique: 'Randonnée', equipement: 'Tentes', tarif: 30, disponible: false },
    ];
    setEmplacements(fakeEmplacements);
  };

  const loadReservations = async () => {
    const fakeReservations: Reservation[] = [
      {
        id_reservation: '1',
        date_debut: '2024-09-01',
        date_fin: '2024-09-05',
        statut: 'Confirmée',
        message_voyageur: 'Excité pour le séjour!',
        emplacement: emplacements[0], 
      },
      {
        id_reservation: '2',
        date_debut: '2024-09-10',
        date_fin: '2024-09-15',
        statut: 'En attente',
        message_voyageur: 'Vivement ce séjour!',
        emplacement: emplacements[1],
      },
    ];
    setReservations(fakeReservations);
  };
  

  const saveUser = async () => {
    Alert.alert('Succès', 'Informations sauvegardées avec succès.');
    setIsEditing(false);
};

const handleChange = (field: keyof User, value: string) => {
    setUserInfo({ ...userInfo, [field]: value });
};

const handleSave = () => {
    saveUser();
};

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission requise', 'Vous devez autoriser l\'accès à la galerie.');
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
      return <Image source={{ uri: userInfo.photo }} style={styles.profileImage} />;
    } else {
      const initials = `${userInfo.prenom.charAt(0)}${userInfo.nom.charAt(0)}`.toUpperCase();
      return (
        <View style={styles.defaultImageContainer}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
      );
    }
  };

  const addEmplacement = () => {
    // Logique pour ajouter un emplacement
    Alert.alert('Ajouter Emplacement', 'Fonctionnalité non implémentée.');
};

const deleteEmplacement = (id: string) => {
    // Logique pour supprimer un emplacement
    Alert.alert('Supprimer Emplacement', `Êtes-vous sûr de vouloir supprimer l'emplacement ${id}?`);
};

const addReservation = () => {
    // Logique pour ajouter une réservation
    Alert.alert('Ajouter Réservation', 'Fonctionnalité non implémentée.');
};

const deleteReservation = (id: string) => {
    // Logique pour supprimer une réservation
    Alert.alert('Supprimer Réservation', `Êtes-vous sûr de vouloir supprimer la réservation ${id}?`);
};

  const navigateToEmplacementDetails = (emplacement: Emplacement) => {
    navigation.navigate('Emplacement_detail', { emplacement });
  };

  const navigateToReservationDetails = (reservation: Reservation) => {
    navigation.navigate('Reservation_detail', { reservation });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileImageContainer}>
          {renderProfileImage()}
          {isEditing && (
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Choisir une photo</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Profil</Text>
                        {isEditing ? null : (
                            <TouchableOpacity onPress={() => setIsEditing(true)}>
                                <Ionicons name="pencil" size={24} color="#6200EE" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {isEditing ? (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Prénom"
                                value={userInfo.prenom}
                                onChangeText={(value) => handleChange('prenom', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nom"
                                value={userInfo.nom}
                                onChangeText={(value) => handleChange('nom', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={userInfo.email}
                                onChangeText={(value) => handleChange('email', value)}
                                keyboardType="email-address"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Téléphone"
                                value={userInfo.telephone}
                                onChangeText={(value) => handleChange('telephone', value)}
                                keyboardType="phone-pad"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Mot de passe"
                                value={userInfo.mot_de_passe}
                                onChangeText={(value) => handleChange('mot_de_passe', value)}
                                secureTextEntry
                            />
                            <TouchableOpacity style={styles.button} onPress={handleSave}>
                                <Text style={styles.buttonText}>Sauvegarder</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <Text style={styles.infoText}>Prénom: <Text style={styles.infoValue}>{userInfo.prenom}</Text></Text>
                            <Text style={styles.infoText}>Nom: <Text style={styles.infoValue}>{userInfo.nom}</Text></Text>
                            <Text style={styles.infoText}>Email: <Text style={styles.infoValue}>{userInfo.email}</Text></Text>
                            <Text style={styles.infoText}>Téléphone: <Text style={styles.infoValue}>{userInfo.telephone}</Text></Text>
                            <Text style={styles.infoText}>Rôle: <Text style={styles.infoValue}>{userInfo.role}</Text></Text>
                        </>
                    )}
                </View>

        <View style={styles.emplacementContainer}>
          <Text style={styles.sectionTitle}>Mes Emplacements <Ionicons name="home" size={20} color="#6200EE" /></Text>
          {emplacements.map(emplacement => (
            <TouchableOpacity key={emplacement.id_emplacement} onPress={() => navigateToEmplacementDetails(emplacement)}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{emplacement.localisation}</Text>
                <Text style={styles.cardText}>Caractéristiques: {emplacement.caracteristique}</Text>
                <Text style={styles.cardText}>Équipement: {emplacement.equipement}</Text>
                <Text style={styles.cardText}>Tarif: {emplacement.tarif} €</Text>
                <Text style={styles.cardText}>Disponible: {emplacement.disponible ? 'Oui' : 'Non'}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.reservationContainer}>
  <Text style={styles.sectionTitle}>Mes Réservations <Ionicons name="calendar" size={20} color="#6200EE" /></Text>
  {reservations.map(reservation => (
    <TouchableOpacity key={reservation.id_reservation} onPress={() => navigateToReservationDetails(reservation)}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}> {reservation.emplacement.localisation}:</Text>
        <Text style={styles.cardTitle}>{reservation.date_debut} / {reservation.date_fin}</Text>
        <Text style={styles.cardText}>Statut: {reservation.statut}</Text>
        <Text style={styles.cardText}>Message: {reservation.message_voyageur}</Text>
        <Text style={styles.cardText}>Caractéristique: {reservation.emplacement.caracteristique}</Text>
        <Text style={styles.cardText}>Équipement: {reservation.emplacement.equipement}</Text>
        <Text style={styles.cardText}>Tarif: {reservation.emplacement.tarif} €</Text>
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
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  defaultImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  emplacementContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  reservationContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#6200EE',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
},
infoText: {
  fontSize: 16,
  marginVertical: 5,
},
infoValue: {
  fontWeight: 'bold',
},
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
});
