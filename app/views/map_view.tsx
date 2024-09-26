import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Callout, Marker } from 'react-native-maps'; 
import React, { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import Autocomplete from 'react-native-autocomplete-input';
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

    return (
        <View style={styles.container}>
            <View style={styles.autocompleteWrapper}>
                <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
                <Autocomplete
                    data={filteredCities}
                    defaultValue={query}
                    onChangeText={handleSearch}
                    placeholder="Entrez le nom d’une ville"
                    flatListProps={{
                        renderItem: ({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectCity(item)}>
                                <Text style={styles.autocompleteItemText}>{item.city_code}</Text>
                            </TouchableOpacity>
                        ),
                        
                    }}
                    containerStyle={styles.autocompleteContainer}
                    inputContainerStyle={styles.inputContainer}
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
        </View>
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
    },
    searchIcon: {
        marginRight: 10,
    },
    autocompleteContainer: {
        flex: 1,
    },
    inputContainer: {
        borderWidth: 0,
    },
    list: {
        borderWidth: 0,
        borderRadius: 10,
        position: 'absolute',
        top: 40, // Ajustez cette valeur en fonction de la hauteur de votre input
        left: 0,
        right: 0,
        zIndex: 1,
        maxHeight: 200, // Limite la hauteur de la liste pour éviter qu'elle n'agrandisse la vue principale
    },
    autocompleteItemText: {
        fontSize: 18, // Augmentez cette valeur pour rendre le texte plus grand
        padding: 10, // Ajoutez du padding pour rendre les éléments plus grands
    },
});