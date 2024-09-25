import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { renderRating } from '../utils/renderRating';
import EmplacementDetailsImages from '../components/emplacement_details_images';
import EmplacementDetailsFacilities from '../components/emplacement_details_facilities';
import EmplacementDetailsComments from '../components/emplacement_details_comments';
import EmplacementDetailsDescription from '../components/emplacement_details_description';
import EmplacementDetailsDisponibilities from '../components/emplacement_details_disponibilities';

export default function EmplacementDetails({ route }) {
    const { marker } = route.params;

    function Separateur() {
        return (<View
        style={{
            borderBottomColor: 'gray',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginHorizontal:30,
            marginVertical: 20
        }}
        />);
    }

    return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <EmplacementDetailsImages />
            <EmplacementDetailsDescription marker={marker} />
            <Separateur />
            <EmplacementDetailsFacilities />
            <Separateur />
            <EmplacementDetailsComments markers = {marker}/>
            <Separateur />
            <EmplacementDetailsDisponibilities />
            <Separateur />
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