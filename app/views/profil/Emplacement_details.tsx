import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Emplacement_details({ route, navigation }) {
  const { emplacement } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{emplacement.localisation}</Text>
      <Text>Caractéristiques: {emplacement.caracteristique}</Text>
      <Text>Équipement: {emplacement.equipement}</Text>
      <Text>Tarif: {emplacement.tarif} €</Text>
      <Text>Disponible: {emplacement.disponible ? 'Oui' : 'Non'}</Text>

      <Button title="Modifier" onPress={() => { /* Fonction pour modifier */ }} />
      <Button title="Supprimer" color="red" onPress={() => { /* Fonction pour supprimer */ }} />
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
