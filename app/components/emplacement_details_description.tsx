import { Text, View, StyleSheet } from 'react-native';
import React from 'react';

interface EmplacementDetailsDescriptionProps {
    marker: any;
}

export default function EmplacementDetailsDescription({ marker }: EmplacementDetailsDescriptionProps) {
    return (
        <View>
            <Text style={styles.title}>{marker.name}</Text>
            <Text style={styles.address}>Nom de la commune , France</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 10,
        textAlign: 'left',
    },
    address: {
        fontSize: 16,
        marginHorizontal: 10,
        textAlign: 'left',
    },
});