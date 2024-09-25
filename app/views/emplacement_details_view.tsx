import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmplacementDetails({ route }) {
    const { marker } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{marker.city_code}</Text>
            <Text>Latitude: {marker.latitude}</Text>
            <Text>Longitude: {marker.longitude}</Text>
            <Text>Department: {marker.department_name}</Text>
            <Text>Region: {marker.region_name}</Text>
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