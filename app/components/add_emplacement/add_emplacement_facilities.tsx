import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RadioButton, List } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const iconMap = {
    "Wi-Fi": "wifi",
    "Piscine": "water",
    "Parking": "car",
    "Animaux acceptés": "paw",
    "Terrasse": "home",
    "Électricité": "flash",
    "Eau potable": "water",
    "Poubelles": "trash",
    "Toit": "home",
    "Feu de camp": "campfire",
};

export default function AddEmplacementFacilities() {
    const [selectedFacilities, setSelectedFacilities] = useState({});

    const handleSelection = (facility, value) => {
        setSelectedFacilities({
            ...selectedFacilities,
            [facility]: value,
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Sélectionner les équipements</Text>
            <View style={styles.headerRow}>
            </View>
            {Object.keys(iconMap).map((facility) => (
                <View key={facility} style={styles.item}>
                    {iconMap[facility] === 'campfire' ? (
                        <MaterialCommunityIcons name="campfire" size={24} color="#6D4C41" />
                    ) : iconMap[facility] === 'trash' ? (
                        <Ionicons name="trash" size={24} color="#B0BEC5" />
                    ) : (
                        <List.Icon icon={iconMap[facility]} color="#00796B" />
                    )}
                    <Text style={styles.text}>{facility}</Text>
                    <View style={styles.radioContainer}>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="oui"
                                status={selectedFacilities[facility] === 'oui' ? 'checked' : 'unchecked'}
                                onPress={() => handleSelection(facility, 'oui')}
                                color="#007BFF"
                            />
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="non"
                                status={selectedFacilities[facility] === 'non' ? 'checked' : 'unchecked'}
                                onPress={() => handleSelection(facility, 'non')}
                                color="#007BFF"
                            />
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#00796B',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    headerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#E0E0E0', // Couleur de fond pour le bouton
        elevation: 2, // Ombre pour un effet 3D
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 1,
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#424242',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
});
