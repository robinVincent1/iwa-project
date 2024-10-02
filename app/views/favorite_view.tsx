import React from 'react';
import { View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export default function FavoritesPage({ route }) {
    const { favoritesData } = route.params; // Récupérer les favoris passés en paramètre

    const renderItem = ({ item }) => (
        <View style={styles.favoriteItem}>
            <ImageBackground
                source={{ uri: 'https://via.placeholder.com/300' }} // Image fictive à remplacer par l'URL réelle
                style={styles.imageBackground}
            >
                <Text style={styles.itemText}>Description</Text>
            </ImageBackground>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tous mes favoris</Text>
            <FlatList
                data={favoritesData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    favoriteItem: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageBackground: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajouter un fond sombre pour la lisibilité du texte
        padding: 5,
        borderRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
