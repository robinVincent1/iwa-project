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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
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

