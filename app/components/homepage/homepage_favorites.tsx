import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomepageFavorites() {
    const data = [...new Array(6).keys(), 'arrow']; // Ajouter un élément 'arrow' à la fin
    const width = Dimensions.get("window").width;
    const carouselRef = React.useRef<ICarouselInstance>(null);
    const navigation = useNavigation();

    const handleArrowPress = () => {
       // navigation.navigate('AnotherPage'); // Remplacez 'AnotherPage' par le nom de la page vers laquelle vous voulez naviguer
    };

    return (
        <View style={styles.container}>
            <Text>Favoris</Text>
            <Carousel
                ref={carouselRef}
                width={width}
                height={width / 2}
                data={data}
                loop={false}
                renderItem={({ index, item }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: "center",
                        }}
                    >
                        {item === 'arrow' ? (
                            <TouchableOpacity onPress={handleArrowPress} style={styles.arrowContainer}>
                                <Ionicons name="arrow-forward" size={30} color="black" />
                            </TouchableOpacity>
                        ) : (
                            <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
                        )}
                    </View>
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
    padding: 20, // Ajout de padding pour éviter que le contenu soit collé aux bords
  },
  arrowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});