import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function EmplacementDetailsDisponibilities() {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Disponibilité</Text>
                <Text style={styles.text}>Vous n'avez pas encore sélectionné de dates</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity>
                    <Ionicons name="calendar" size={33} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    textContainer: {
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:10,
    },
    title: {
        fontSize: 24, // Augmente la taille du texte
        marginHorizontal: 10, // Ajoute une marge horizontale de 10
        fontWeight: 'bold', // Met le texte en gras
    },
    text: {
        fontSize: 16,
        marginHorizontal: 10,
    },
});