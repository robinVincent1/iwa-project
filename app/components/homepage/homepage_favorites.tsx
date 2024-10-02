import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomepageFavorites() {
    const data = [...new Array(6).keys(), 'arrow']; // Ajouter un élément 'arrow' à la fin
    const width = Dimensions.get("window").width;
    const carouselRef = React.useRef<ICarouselInstance>(null);
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState(data.slice(0, -1).map(() => true)); // Initialiser tous les éléments comme favoris

    const handleArrowPress = () => {
      const favoriteItems = data.slice(0, -1); // Exclure l'élément 'arrow'
      navigation.navigate('FavoritesPage', { favoritesData: favoriteItems });
  };
  

    const toggleFavorite = (index) => {
        setFavorites((prevFavorites) => {
            const newFavorites = [...prevFavorites];
            newFavorites[index] = !newFavorites[index];
            return newFavorites;
        });
    };

    const handleItemPress = (index) => {
        console.log(`Item ${index} cliqué`);
        // Ajoutez ici la logique de navigation ou d'action lorsque l'élément est cliqué
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vos emplacements favoris</Text>
            <Carousel
                ref={carouselRef}
                width={width}
                height={width / 2}
                data={data}
                loop={false}
                renderItem={({ index, item }) => (
                    <TouchableOpacity
                        style={item === 'arrow' ? styles.arrowItem : styles.carouselItem}
                        onPress={() => handleItemPress(index)}
                        activeOpacity={1} // Désactiver l'effet de flash blanc
                    >
                        {item === 'arrow' ? (
                            <TouchableOpacity onPress={handleArrowPress} style={styles.arrowContainer} activeOpacity={1}>
                                <View style={styles.arrowCircle}>
                                    <Ionicons name="arrow-forward" size={30} color="black" />
                                </View>
                                <Text style={styles.arrowText}>Consulter tous mes favoris</Text>
                            </TouchableOpacity>
                        ) : (
                            <ImageBackground
                                source={{ uri: 'https://via.placeholder.com/300' }} // Remplacez par l'URL de votre image
                                style={styles.imageBackground}
                            >
                                <TouchableOpacity
                                    style={styles.heartIcon}
                                    onPress={() => toggleFavorite(index)}
                                    activeOpacity={1} // Désactiver l'effet de flash blanc
                                >
                                    <Ionicons
                                        name={favorites[index] ? "heart" : "heart-outline"}
                                        size={32}
                                        color="red"
                                    />
                                </TouchableOpacity>
                                <View style={styles.textContainer}>
                                    <Text style={styles.itemText}>Description</Text>
                                </View>
                            </ImageBackground>
                        )}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15, // Arrondir les coins
    margin: 10, // Ajouter du margin entre les éléments
    overflow: 'hidden', // Assurer que le contenu reste à l'intérieur des bords arrondis
  },
  arrowItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10, // Ajouter du margin pour aligner avec les autres éléments
  },
  arrowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  itemText: {
    fontSize: 20,
    color: 'white', // Couleur du texte pour qu'il soit visible sur l'image
    padding: 10,
    borderRadius: 5,
    textShadowColor: 'black', // Couleur de l'ombre (contour)
    textShadowOffset: { width: -1, height: 1 }, // Décalage de l'ombre
    textShadowRadius: 10, // Rayon de l'ombre
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  title: {
    fontSize: 24, // Augmente la taille du texte
    fontWeight: 'bold', // Met le texte en gras
    alignSelf: 'flex-start', // Aligne le texte à gauche
    marginLeft: 10, // Ajoute une marge à gauche pour coller le titre sur la gauche
  },
});