import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddEmplacementMap from '../../components/add_emplacement/add_emplacement_map';
import AddEmplacementFacilities from '../../components/add_emplacement/add_emplacement_facilities';

export default function AddEmplacement({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Ajouter un emplacement</Text>
            </View>
            <View style={styles.mapContainer}>
                <AddEmplacementMap />
            </View>    
            <View style={styles.facilitiesContainer}>
                <AddEmplacementFacilities />
            </View> 
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    mapContainer: {
        height: 400, // Hauteur fixe pour le conteneur de la carte
        borderRadius: 10, // Coins arrondis pour le conteneur
        overflow: 'hidden', // Pour s'assurer que la carte ne dépasse pas du conteneur
    },
    facilitiesContainer: {
        marginTop: 20,
    },
});