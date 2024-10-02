import { Text, View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { renderRating } from '../../utils/renderRating';
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Avis {
    id_avis: string;
    note: number;
    commentaire: string;
    date_avis: string;
    prenom_utilisateur: string;
}

interface EmplacementDetailsRatingsProps {
    avis: Avis[]; // Liste des avis
    rating: number; // Note moyenne de l'emplacement
}

const MAX_COMMENT_LENGTH = 200;

const truncateComment = (comment: string) => {
    if (comment.length <= MAX_COMMENT_LENGTH) return comment;
    const truncated = comment.substring(0, MAX_COMMENT_LENGTH);
    return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
};

export default function EmplacementDetailsRatings({ avis, rating }: EmplacementDetailsRatingsProps) {
    const data = [...avis, 'arrow']; // Ajouter un élément 'arrow' à la fin pour voir plus d'avis
    const width = Dimensions.get("window").width;
    const carouselRef = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    const navigation = useNavigation();

    const handleArrowPress = () => {
        navigation.navigate('EmplacementDetailsAllRatings');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {renderRating(rating, true)}
                <Text style={styles.commentsText}>{avis.length} Commentaires</Text>
            </View>
            <Carousel
                ref={carouselRef}
                width={width} // Assurez-vous que la largeur s'adapte à l'écran
                height={width / 2}
                data={data}
                loop={false}
                onProgressChange={(offsetProgress: number, absoluteProgress: number) => {
                    progress.value = absoluteProgress;
                }}
                renderItem={({ index, item }) => (
                    item === 'arrow' ? (
                        <TouchableOpacity style={styles.arrowContainer} onPress={handleArrowPress}>
                            <View style={styles.arrowCircle}>
                                <Ionicons name="arrow-forward" size={30} color="#fff" />
                            </View>
                            <Text style={styles.arrowText}>Voir tous les avis</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.itemContainer}>
                            <View style={styles.profileContainer}>
                                <View style={styles.profileImagePlaceholder} />
                                <View style={styles.profileTextContainer}>
                                    <View style={styles.userInfo}>
                                        <Text style={styles.profileName}>{item.prenom_utilisateur}</Text>
                                        <Text style={styles.commentDate}>{item.date_avis}</Text>
                                    </View>
                                    {renderRating(item.note, false)}
                                </View>
                            </View>
                            <View style={styles.commentContainer}>
                                <ScrollView>
                                    <Text style={styles.commentText}>
                                        {truncateComment(item.commentaire)}
                                    </Text>
                                </ScrollView>
                            </View>
                        </View>
                    )
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 10,
    },
    commentsText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 15,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        maxWidth: '100%', // Limiter la largeur à l'écran
        width: '80%', // Assurez-vous que les avis occupent toute la largeur disponible
        alignSelf: 'center', // Centrer l'élément
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImagePlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ccc',
        marginRight: 10,
    },
    profileTextContainer: {
        flexDirection: 'column',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    commentDate: {
        fontSize: 12,
        color: '#888',
    },
    commentContainer: {
        marginTop: 10,
    },
    commentText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'justify',
    },
    arrowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    arrowCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowText: {
        marginTop: 10,
        fontSize: 14,
        color: '#007bff',
        fontWeight: 'bold',
    },
});
