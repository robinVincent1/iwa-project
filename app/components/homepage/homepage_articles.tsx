import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const articles = [
    {
        id_article: '1',
        titre: 'Article 1',
        extrait_description: 'Ceci est un extrait de l\'article 1.',
        description: 'Voici la description complète de l\'article 1. Il parle de divers sujets intéressants.',
        date: '28/09/2024',
        image: 'https://via.placeholder.com/150',
    },
    {
        id_article: '2',
        titre: 'Article 2',
        extrait_description: 'Ceci est un extrait de l\'article 2.',
        description: 'La description complète de l\'article 2 contient des informations détaillées.',
        date: '29/09/2024',
        image: 'https://via.placeholder.com/150',
    },
    // Ajoutez plus d'articles ici
];

export default function HomepageArticles() {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.articleContainer} onPress={() => handleArticlePress(item)}>
            <Image source={{ uri: item.image }} style={styles.articleImage} />
            <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{item.titre}</Text>
                <Text style={styles.articleExcerpt}>{item.extrait_description}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleArticlePress = (article) => {
        navigation.navigate('ArticleDetails', { article });
    };

    const handleSeeAllPress = () => {
        navigation.navigate('ArticlesPage', { articlesData: articles });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Articles & Blogs</Text>
            <FlatList
                data={articles.slice(0, 2)} // Affichez seulement les 2 premiers articles ici
                renderItem={renderItem}
                keyExtractor={item => item.id_article}
                contentContainerStyle={styles.flatListContainer} // Appliquez un style pour le padding
            />
            <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAllPress}>
                <View style={styles.arrowCircle}>
                    <Ionicons name="arrow-down" size={30} color="black" />
                </View>
                <Text style={styles.arrowText}>Consulter tous les articles</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10, // Ajoute du padding horizontal pour tout le conteneur
    },
    flatListContainer: {
        paddingBottom: 20, // Ajoute du padding au bas de la liste
    },
    articleContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10, // Ajoute du padding autour du contenu de l'article
    },
    articleImage: {
        width: 100,
        height: 100,
    },
    articleContent: {
        flex: 1,
        paddingLeft: 10,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    articleExcerpt: {
        fontSize: 14,
        color: '#666',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    seeAllButton: {
        alignItems: 'center',
        marginTop: 20,
    },
    arrowCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10, // Espace entre le cercle et le texte
    },
    arrowText: {
        fontSize: 14,
        color: '#666',
    },
});
