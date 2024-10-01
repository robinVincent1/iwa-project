import { Text, View, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { renderRating } from '../../utils/renderRating';
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import { Ionicons } from '@expo/vector-icons';

interface EmplacementDetailsCommentsProps {
    markers: any //A changer
}

const MAX_COMMENT_LENGTH = 200;
const COMMENT_NUMBERS = 6;

const truncateComment = (comment: string) => {
    if (comment.length <= MAX_COMMENT_LENGTH) return comment;
    const truncated = comment.substring(0, MAX_COMMENT_LENGTH);
    return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
};

export default function EmplacementDetailsComments({ markers }: EmplacementDetailsCommentsProps) {

    const data = [...new Array(COMMENT_NUMBERS).keys(), 'arrow']; // Ajouter un élément 'arrow' à la fin
    const width = Dimensions.get("window").width;
    const carouselRef = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    const handleArrowPress = () => {
        console.log('Flèche cliquée');
        // Ajoutez ici la logique de navigation ou d'action lorsque la flèche est cliquée
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
                {renderRating(markers.rating, true)}
                <Text style={{ marginLeft: 10 }}>223 Commentaires</Text>
            </View>
            <Carousel
                ref={carouselRef}
                width={width}
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
                                <Ionicons name="arrow-forward" size={30} color="black" />
                            </View>
                            <Text style={styles.arrowText}>Cliquez pour voir tous les avis</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.itemContainer}>
                            <View style={styles.profileContainer}>
                                <View style={styles.profileImagePlaceholder}>
                                    {/* Placeholder pour l'image de profil */}
                                </View>
                                <View style={styles.profileTextContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.profileName}>Prénom {index}</Text>
                                        <Text style={styles.commentDate}>Date {index}</Text>
                                    </View>
                                    {renderRating(index, false)}
                                </View>
                            </View>
                            <View style={styles.commentContainer}>
                                <ScrollView>
                                    <Text style={styles.commentText}>
                                        {truncateComment("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.")}
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
    itemContainer: {
        flex: 1,
        borderWidth: 1,
        justifyContent: "center",
        borderRadius: 15, // Bords arrondis
        marginHorizontal: 10, // Ne pas prendre toute la largeur
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
        borderRadius: 25, // Rond
        backgroundColor: '#ccc', // Couleur de fond pour le placeholder
        marginRight: 10,
    },
    profileTextContainer: {
        flexDirection: 'column', // Aligner le prénom et la note verticalement
    },
    profileName: {
        fontSize: 18,
    },
    commentDate: {
        marginLeft: 30, // Décale un peu plus la date sur la droite
        fontSize: 14,
        color: '#888',
        fontStyle: 'italic', // Met en italique
    },
    commentContainer: {
        marginTop: 60, // Espace entre le profil et le commentaire
        borderRadius: 10,
        padding: 10,
        maxHeight: 100, // Limite la hauteur du conteneur
    },
    commentText: {
        fontSize: 15,
        textAlign: 'justify', // Justifie le texte du commentaire
    },
    arrowContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 10,
    },
    arrowCircle: {
        width: 60,
        height: 60,
        borderRadius: 30, // Faire un cercle
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10, // Espace entre le cercle et le texte
    },
    arrowText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});