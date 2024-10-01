import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const articles = [
    {
        id: '1',
        title: 'Article 1',
        excerpt: 'Ceci est un extrait de l\'article 1.',
        imageUrl: 'https://via.placeholder.com/150',
    },
    {
        id: '2',
        title: 'Article 2',
        excerpt: 'Ceci est un extrait de l\'article 2.',
        imageUrl: 'https://via.placeholder.com/150',
    },
    // Ajoutez plus d'articles ici
];

export default function HomepageArticles() {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.articleContainer} onPress={() => handleArticlePress(item)}>
            <Image source={{ uri: item.imageUrl }} style={styles.articleImage} />
            <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <Text style={styles.articleExcerpt}>{item.excerpt}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleArticlePress = (article) => {
        // Logique de navigation ou d'action lorsque l'article est cliqué
        console.log('Article cliqué:', article);
    };

    return (
        <View>
            <Text style={styles.title}>Articles & Blogs</Text>
            <FlatList
                data={articles}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.container}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    articleContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
    },
    articleImage: {
        width: 100,
        height: 100,
    },
    articleContent: {
        flex: 1,
        padding: 10,
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
        fontSize: 24, // Augmente la taille du texte
        fontWeight: 'bold', // Met le texte en gras
        alignSelf: 'flex-start', // Aligne le texte à gauche
        marginLeft: 10, // Ajoute une marge à gauche pour coller le titre sur la gauche
      },
});
