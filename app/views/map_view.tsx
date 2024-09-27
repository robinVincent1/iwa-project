import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Callout, Marker } from 'react-native-maps'; 
import React, { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { renderRating } from '../utils/renderRating';
import { useDispatch } from 'react-redux';
import Slider from '@react-native-community/slider';

const cities = require('../assets/cities.json');

export default function LocationMapView() {

    const mapRef = useRef<any>(); //Changer le type plus tard
    const [query, setQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [locationGranted, setLocationGranted] = useState(false);
    const [radius, setRadius] = useState(10); // Rayon en kilomètres
    const [userLocation, setUserLocation] = useState(null);
    const [showSlider, setShowSlider] = useState(false); // État pour contrôler la visibilité du slider
    const navigation = useNavigation();
    const dispatch = useDispatch();

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

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
                return;
            }
            setLocationGranted(true);

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000);
        })();
    }, []);

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

    const handleFocus = () => {
        setShowSlider(false); // Ferme le slider lorsque le TextInput est focalisé
    };


    const centerUserLocation = async () => {
        if (locationGranted) {
            let location = await Location.getCurrentPositionAsync({});
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 1000);
        } else {
            Alert.alert('Location permission not granted');
        }
    };

    const filterMarkersByRadius = () => {
        if (!userLocation) return markers;
        return markers.filter(marker => {
            const distance = getDistanceFromLatLonInKm(
                userLocation.latitude,
                userLocation.longitude,
                marker.latitude,
                marker.longitude
            );
            return distance <= radius;
        });
    };

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Rayon de la Terre en km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance en km
        return d;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
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
                        onFocus={handleFocus}
                    />
                </View>
                {showSlider && (
                    <View style={styles.sliderContainer}>
                        <Text>Rayon: {radius} km</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={1}
                            maximumValue={500} //A modifier
                            step={1}
                            value={radius}
                            onValueChange={setRadius}
                        />
                    </View>
                )}
                <MapView
                    style={styles.map}
                    initialRegion={INITIAL_REGION}
                    ref={mapRef}
                    showsUserLocation={true} // Affiche le point bleu de localisation
                >
                    {filterMarkersByRadius().map((marker, index) => (
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
                <TouchableOpacity style={styles.locationButton} onPress={centerUserLocation}>
                    <Ionicons name="locate" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sliderToggleButton} onPress={() => setShowSlider(!showSlider)}>
                    <Ionicons name="options" size={24} color="white" />
                </TouchableOpacity>
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
    locationButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#007AFF',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
    sliderToggleButton: {
        position: 'absolute',
        bottom: 80, // Positionné au-dessus du bouton de localisation
        left: 20,
        backgroundColor: '#007AFF',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
    },
    sliderContainer: {
        position: 'absolute',
        top: 70, // Positionné en dessous du TextInput
        left: 10,
        right: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        zIndex: 3,
    },
    slider: {
        width: '100%',
        height: 40,
    },
});