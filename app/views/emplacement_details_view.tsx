import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { renderRating } from '../utils/renderRating';
import EmplacementDetailsImages from '../components/emplacement_details_images';
import EmplacementDetailsFacilities from '../components/emplacement_details_facilities';
import EmplacementDetailsComments from '../components/emplacement_details_comments';

export default function EmplacementDetails({ route }) {
    const { marker } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>{marker.name}</Text>
            <EmplacementDetailsImages />
            <EmplacementDetailsFacilities />
            <EmplacementDetailsComments markers = {marker}/>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.text_button}>Réserver</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20, // Ajout d'une marge en bas pour éviter le chevauchement
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