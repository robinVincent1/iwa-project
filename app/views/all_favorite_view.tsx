import React from 'react';
import { View, Text, FlatList, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function FavoritesPage({ route }) {
    const { favoritesData } = route.params; // Récupérer les favoris passés en paramètre
    const navigation = useNavigation();

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
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Tous mes favoris</Text>
            </View>
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
        paddingTop: 40, // Réduire le padding en haut pour rapprocher l'en-tête du haut de la page
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
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
        textAlign: 'center',
        flex: 1,
    },
});