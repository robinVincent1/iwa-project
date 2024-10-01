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
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

    return (
        <View>
            <Text style={styles.title}>Articles & Blogs</Text>
            <FlatList
                data={articles}
                renderItem={renderItem}
                keyExtractor={item => item.id_article}
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
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 10,
    },
});
