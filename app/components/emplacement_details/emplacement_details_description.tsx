import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Emplacement } from '../../views/map_view';

interface EmplacementDetailsDescriptionProps {
    emplacement: Emplacement
}

export default function EmplacementDetailsDescription({ emplacement }: EmplacementDetailsDescriptionProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{emplacement.localisation}</Text> 
            </View>
            <TouchableOpacity onPress={toggleFavorite} style={styles.iconContainer}>
                <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={32} color="#FF0000" />
            </TouchableOpacity>
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
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
    },
    address: {
        fontSize: 16,
        textAlign: 'left',
    },
});
