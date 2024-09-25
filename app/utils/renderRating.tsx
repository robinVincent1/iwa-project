import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {[...Array(fullStars)].map((_, index) => (
                <Ionicons key={`full-${index}`} name="star" size={20} color="#FFD700" />
            ))}
            {halfStar === 1 && <Ionicons name="star-half" size={20} color="#FFD700" />}
            {[...Array(emptyStars)].map((_, index) => (
                <Ionicons key={`empty-${index}`} name="star-outline" size={20} color="#FFD700" />
            ))}
            <Text style={{ marginLeft: 5 }}>({rating.toFixed(1)})</Text>
        </View>
    );
};