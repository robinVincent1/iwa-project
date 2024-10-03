import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Rating } from '@kolking/react-native-rating';
import { useState } from 'react';

type ReservationParams = {
    reservation: {
        date: string;
        statut: string;
        message_voyageur: string;
    };
};

export default function EmplacementReservationDetails() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<{ params: ReservationParams }, 'params'>>();
    const { reservation } = route.params;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        // Logique pour soumettre l'avis
        console.log('Rating:', rating);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Détails de la réservation</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{reservation.date}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Statut:</Text>
                <Text style={styles.value}>{reservation.statut}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Message:</Text>
                <Text style={styles.value}>{reservation.message_voyageur}</Text>
            </View>
            <View style={styles.reviewContainer}>
                <Text style={styles.reviewTitle}>Laisser un avis</Text>
                <Rating
                    rating={rating}
                    onChange={setRating}
                    max={5}
                    iconWidth={24}
                    iconHeight={24}
                />

                <Button title="Soumettre" onPress={handleSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    value: {
        flex: 1,
    },
    reviewContainer: {
        marginTop: 20,
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commentInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});