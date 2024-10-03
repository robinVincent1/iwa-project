import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function AddEmplacementDescription() {
    const [description, setDescription] = useState('');
    const maxLength = 400;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Description</Text>
            <Text style={styles.instructions}>Décrivez brièvement votre emplacement</Text>
            <TextInput
                style={styles.input}
                multiline
                maxLength={maxLength}
                placeholder="Entrez la description ici..."
                value={description}
                onChangeText={setDescription}
            />
            <Text style={styles.charCount}>{description.length}/{maxLength} caractères</Text>
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
    instructions: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    input: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
    },
    charCount: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray',
        textAlign: 'right',
    },
});