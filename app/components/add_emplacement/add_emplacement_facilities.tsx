import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
                <View style={styles.headerItem}>
                    <Ionicons name="checkmark" size={24} color="green" />
                </View>
                <View style={styles.headerItem}>
                    <Ionicons name="close" size={24} color="red" />
                </View>
            </View>
            {Object.keys(iconMap).map((facility) => (
                <View key={facility} style={styles.item}>
                    {iconMap[facility] === 'campfire' ? (
                        <MaterialCommunityIcons name="campfire" size={24} color="black" />
                    ) : iconMap[facility] === 'trash' ? (
                        <Ionicons name="trash" size={24} color="black" />
                    ) : (
                        <List.Icon icon={iconMap[facility]} />
                    )}
                    <Text style={styles.text}>{facility}</Text>
                    <View style={styles.radioContainer}>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="oui"
                                status={selectedFacilities[facility] === 'oui' ? 'checked' : 'unchecked'}
                                onPress={() => handleSelection(facility, 'oui')}
                            />
                        </View>
                        <View style={styles.radioItem}>
                            <RadioButton
                                value="non"
                                status={selectedFacilities[facility] === 'non' ? 'checked' : 'unchecked'}
                                onPress={() => handleSelection(facility, 'non')}
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
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
    },
    headerText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        flex: 1,
        fontSize: 16,
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