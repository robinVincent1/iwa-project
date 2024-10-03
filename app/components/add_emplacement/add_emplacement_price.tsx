import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function AddEmplacementPrice() {
    const [price, setPrice] = useState('');

    const handlePriceChange = (value) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        if (numericValue === '') {
            setPrice('');
        } else {
            const numericPrice = Math.max(1, Math.min(1000, parseInt(numericValue, 10)));
            setPrice(numericPrice.toString());
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Prix de l'emplacement</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Entrez le prix en euros"
                placeholderTextColor="gray"
                value={price}
                onChangeText={handlePriceChange}
            />
            <Text style={styles.instructions}>Le prix doit être compris entre 1 et 1000 euros.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF', // Couleur de fond blanche
        borderRadius: 8, // Bordures arrondies
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5, // Ombre sur Android
        marginBottom: 20, // Espacement en bas
    },
    title: {
        color: '#00796B',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#4CAF50', // Utiliser une couleur en accord avec le reste de l'application
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
    },
    instructions: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray',
    },
});
