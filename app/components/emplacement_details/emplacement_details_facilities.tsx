import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmplacementDetailsFacilities({ equipment }) {
    const iconMap = {
        "Wi-Fi": "wifi",
        "Piscine": "water",
        "Parking": "car",
        "Animaux acceptés": "paw",
        "Terrasse": "home",
        "Barbecue": "bonfire",
        "Électricité": "flash",
        "Eau potable": "water",
        "Poubelles": "trash",
        "Toit": "home",
        "Feu de camp": "bonfire",
    };

    // Diviser la liste des équipements en deux colonnes
    const column1 = equipment.slice(0, Math.ceil(equipment.length / 2));
    const column2 = equipment.slice(Math.ceil(equipment.length / 2));

    return (
        <View style={styles.container}>
            {/* Première colonne d'équipements */}
            <View style={styles.column}>
                {column1.map((equip, index) => (
                    <View style={styles.item} key={index}>
                        <Ionicons name={iconMap[equip] || 'help-circle'} size={20} color="#FFD700" />
                        <Text style={styles.itemText}>{equip}</Text>
                    </View>
                ))}
            </View>

            {/* Deuxième colonne d'équipements */}
            <View style={styles.column}>
                {column2.map((equip, index) => (
                    <View style={styles.item} key={index}>
                        <Ionicons name={iconMap[equip] || 'help-circle'} size={20} color="#FFD700" />
                        <Text style={styles.itemText}>{equip}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    column: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemText: {
        marginLeft: 5,
        fontSize: 16,
    },
});
