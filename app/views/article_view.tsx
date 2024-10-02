import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ArticlesPage({ route, navigation }) {
    const { articlesData } = route.params; // Récupérer les articles passés en paramètre

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
        <View style={styles.container}>
            <Text style={styles.title}>Tous les Articles</Text>
            <FlatList
                data={articlesData}
                renderItem={renderItem}
                keyExtractor={item => item.id_article}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: 20,
    },
});
