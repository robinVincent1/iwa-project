import React from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import { renderRating } from '../utils/renderRating';
import EmplacementDetailsImages from '../components/emplacement_details_images';
import EmplacementDetailsFacilities from '../components/emplacement_details_facilities';

export default function EmplacementDetails({ route }) {
    const { marker } = route.params;

    return (
        <View style={styles.container}>
            <Text>{marker.name}</Text>
            {renderRating(marker.rating)}
            <EmplacementDetailsImages/>
            <EmplacementDetailsFacilities/>
            <Pressable style={styles.button} >
                <Text style={styles.text_button}>Réserver</Text>
            </Pressable>
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
      text_button: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
});