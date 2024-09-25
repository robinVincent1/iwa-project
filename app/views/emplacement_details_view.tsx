import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { renderRating } from '../utils/renderRating';

export default function EmplacementDetails({ route }) {
    const { marker } = route.params;

    return (
        <View style={styles.container}>
            <Text>{marker.name}</Text>
            {renderRating(marker.rating)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});