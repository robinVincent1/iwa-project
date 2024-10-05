import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView } from 'react-native';

export default function AddArticleView() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const maxLength = 400;

    const handleSubmit = () => {
        // Logic to handle article submission
        console.log({
            title,
            description,
            author,
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Ajouter un Article</Text>
            <TextInput
                style={styles.input}
                placeholder="Titre de l'article"
                placeholderTextColor="#B0BEC5"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Auteur"
                placeholderTextColor="#B0BEC5"
                value={author}
                onChangeText={setAuthor}
            />
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.instructions}>Décrivez brièvement votre article</Text>
            <TextInput
                style={styles.textArea}
                multiline
                maxLength={maxLength}
                placeholder="Entrez la description ici..."
                placeholderTextColor="#B0BEC5"
                value={description}
                onChangeText={setDescription}
            />
            <Text style={styles.charCount}>{description.length}/{maxLength} caractères</Text>
            <Button title="Soumettre" onPress={handleSubmit} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00796B',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#00796B',
        marginBottom: 5,
    },
    instructions: {
        fontSize: 14,
        color: '#757575',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#B0BEC5',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#F9F9F9',
        marginBottom: 20,
    },
    textArea: {
        height: 100,
        borderColor: '#B0BEC5',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
        backgroundColor: '#F9F9F9',
    },
    charCount: {
        marginTop: 5,
        fontSize: 12,
        color: '#757575',
        textAlign: 'right',
    },
});