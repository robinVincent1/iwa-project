import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Callout, Marker } from 'react-native-maps'; 
import React, { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { renderRating } from '../utils/renderRating';

const cities = require('../assets/cities.json');

export default function LocationMapView() {

    const mapRef = useRef<any>(); //Changer le type plus tard
    const [query, setQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const navigation = useNavigation();

    const INITIAL_REGION = {
        latitude: 43.6,
        longitude: 3.8833,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    }

    const markers = [
        {
            latitude: 43.6,
            longitude: 3.8833,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            name: "Montpellier 1",
            rating: 4.7
        },
        {
            latitude: 43.3,
            longitude: 3.8833,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            name: "Montpellier 2",
            rating: 0
        },
        {
            latitude: 43.5,
            longitude: 3.8833,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            name: "Montpellier 3",
            rating: 2.3
        },
        {
            latitude: 43.7,
            longitude: 3.8833,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            name: "Montpellier 4",
            rating: 3.5
        },
    ]

    const onMarkerSelected = (marker: any) => {
        mapRef.current.animateToRegion({
            latitude: marker.latitude,
            longitude: marker.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    }

    const onCalloutSelected = (marker: any) => {
        navigation.navigate('EmplacementDetails', { marker });
    };

    const handleSearch = (text: string) => {
        setQuery(text);
        if (text) {
            const filtered = cities.cities.filter((city: any) =>
                city.city_code.toLowerCase().startsWith(text.toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }
    };

    const handleSelectCity = (city: any) => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: parseFloat(city.latitude),
                longitude: parseFloat(city.longitude),
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000); // Ajoutez une durée pour l'animation
        }
        setQuery(city.name);
        setFilteredCities([]);
    };

    const handleOutsidePress = () => {
        setFilteredCities([]);
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.container}>
                <View style={styles.autocompleteWrapper}>
                    <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.textInput}
                        value={query}
                        onChangeText={handleSearch}
                        placeholder="Entrez le nom d’une ville"
                    />
                </View>
                <MapView
                    style={styles.map}
                    initialRegion={INITIAL_REGION}
                    ref={mapRef}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                            title={marker.name}
                            onPress={() => onMarkerSelected(marker)}
                        >
                            <Callout onPress={() => onCalloutSelected(marker)}>
                                <View style={styles.callout}>
                                    <Text style={styles.calloutText}>{marker.name}</Text>
                                    {renderRating(marker.rating, true)}
                                    <Text style={styles.calloutText}>Cliquez pour réserver !</Text>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
                {filteredCities.length > 0 && (
                    <View style={styles.suggestionsContainer}>
                        <FlatList
                            data={filteredCities}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelectCity(item)}>
                                    <View style={styles.itemContainer}>
                                        <Ionicons name="compass" size={20} color="black" />
                                        <Text style={styles.autocompleteItemText}>{item.city_code}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.city_code}
                            style={styles.list}
                        />
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    callout: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        overflow: 'hidden', // Assure que le contenu respecte les bords arrondis
    },
    calloutText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    autocompleteWrapper: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        zIndex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white', // Ajout d'un fond blanc pour le conteneur
        height: 50, // Fixe la hauteur de la vue de l'autocomplete
    },
    searchIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        height: '100%',
        borderWidth: 0,
    },
    suggestionsContainer: {
        position: 'absolute',
        top: 60, // Ajustez cette valeur en fonction de la hauteur de votre input
        left: 10,
        right: 10,
        zIndex: 2, // Assurez-vous que la liste est au-dessus de l'autocompleteWrapper
        maxHeight: 200, // Limite la hauteur de la liste pour éviter qu'elle n'agrandisse la vue principale
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    list: {
        borderWidth: 0,
        borderRadius: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10, // Ajoutez du padding pour rendre les éléments plus grands
    },
    autocompleteItemText: {
        fontSize: 18, // Augmentez cette valeur pour rendre le texte plus grand
        marginLeft: 10, // Ajoutez une marge à gauche pour séparer l'icône du texte
    },
});