import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { renderRating } from '../../utils/renderRating';

const reviews = [
    { id: '1', user: 'User1', rating: 5, comment: 'Excellent!' },
    { id: '2', user: 'User2', rating: 4, comment: 'Very good' },
    { id: '3', user: 'User3', rating: 3, comment: 'Average' },
    // Ajoutez plus d'avis ici
];

export default function EmplacementDetailsAllRatings() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredReviews = reviews.filter(review => {
        if (filter === 'all') return true;
        if (filter === 'recent') return true; // Placeholder logic for recent
        if (filter === 'oldest') return true; // Placeholder logic for oldest
        if (filter === 'best') return true; // Placeholder logic for best
        if (filter === 'worst') return true; // Placeholder logic for worst
        return review.rating === parseInt(filter);
    }).filter(review => review.comment.toLowerCase().includes(search.toLowerCase()));

    const renderStars = (filledStars) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Ionicons
                    key={`star-${i}`}
                    name={i < filledStars ? "star" : "star-outline"}
                    size={18}
                    color="#FFD700"
                />
            );
        }
        return stars;
    };

    const Separator = () => (
        <View style={styles.separator} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tous les avis</Text>
            <ScrollView 
                horizontal 
                style={styles.filterContainer} 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                <TouchableOpacity onPress={() => setFilter('all')} style={styles.filterButton}>
                    <Text>Tout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('recent')} style={styles.filterButton}>
                    <Text>Les plus récents</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('oldest')} style={styles.filterButton}>
                    <Text>Les plus anciens</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('best')} style={styles.filterButton}>
                    <Text>Les meilleurs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('worst')} style={styles.filterButton}>
                    <Text>Les pires</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('5')} style={styles.filterButton}>
                    <View style={styles.starWrapper}>
                        <View style={styles.starContainer}>{renderStars(5)}</View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('4')} style={styles.filterButton}>
                    <View style={styles.starWrapper}>
                        <View style={styles.starContainer}>{renderStars(4)}</View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('3')} style={styles.filterButton}>
                    <View style={styles.starWrapper}>
                        <View style={styles.starContainer}>{renderStars(3)}</View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('2')} style={styles.filterButton}>
                    <View style={styles.starWrapper}>
                        <View style={styles.starContainer}>{renderStars(2)}</View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('1')} style={styles.filterButton}>
                    <View style={styles.starWrapper}>
                        <View style={styles.starContainer}>{renderStars(1)}</View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <FlatList
                data={filteredReviews}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.profileContainer}>
                            <View style={styles.profileImagePlaceholder}>
                                {/* Placeholder pour l'image de profil */}
                            </View>
                            <View style={styles.profileTextContainer}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.profileName}>{item.user}</Text>
                                    <Text style={styles.commentDate}>Date</Text>
                                </View>
                                {renderRating(item.rating, false)}
                            </View>
                        </View>
                        <View style={styles.commentContainer}>
                            <Text style={styles.commentText}>{item.comment}</Text>
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={Separator}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        maxHeight: 60, // Limite la hauteur de la ScrollView
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    filterButton: {
        alignItems: 'center',
        marginRight: 10,
    },
    starWrapper: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 5,
    },
    starContainer: {
        flexDirection: 'row',
    },
    reviewContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    user: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    rating: {
        fontSize: 16,
    },
    comment: {
        fontSize: 14,
    },
    itemContainer: {
        flex: 1,
        justifyContent: "center",
        overflow: 'hidden', // Pour s'assurer que le contenu respecte les bords arrondis
        padding: 10,
        position: 'relative', // Pour positionner les éléments enfants
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute', // Position absolue pour placer en haut à gauche
        top: 10,
        left: 10,
    },
    profileImagePlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc',
        borderRadius: 25,
    },
    profileTextContainer: {
        marginLeft: 10,
    },
    profileName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    commentDate: {
        fontSize: 12,
        color: 'gray',
        marginLeft: 10,
    },
    commentContainer: {
        marginTop: 60, // Pour laisser de la place au profil
    },
    commentText: {
        fontSize: 14,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
});
