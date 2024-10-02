import { View, StyleSheet, PermissionsAndroid, Platform, Button, Text } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function AddEmplacementMap() {
    const mapRef = useRef(null);
    const [markerPosition, setMarkerPosition] = useState({
        latitude: 48.8566, // Coordonnées par défaut pour Paris, France
        longitude: 2.3522,
    });
    const [fixedPosition, setFixedPosition] = useState(null);
    const [isPositionFixed, setIsPositionFixed] = useState(false);

    useEffect(() => {
        const requestLocationPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Permission de localisation refusée");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setMarkerPosition({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        };

        requestLocationPermission();
    }, []);

    const handleRegionChange = (region) => {
        if (!isPositionFixed) {
            setMarkerPosition({
                latitude: region.latitude,
                longitude: region.longitude,
            });
        }
    };

    const handleFixPosition = () => {
        if (isPositionFixed) {
            setIsPositionFixed(false);
        } else {
            setFixedPosition(markerPosition);
            setIsPositionFixed(true);
            console.log("Coordonnées fixées :", markerPosition);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.titleContainer}>
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Text style={styles.title}>Sélectionner un emplacement</Text>
                </View>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        ref={mapRef}
                        showsUserLocation={true}
                        onRegionChange={handleRegionChange} // Utilisation de onRegionChange pour mise à jour en temps réel
                        initialRegion={{
                            latitude: markerPosition.latitude,
                            longitude: markerPosition.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={markerPosition}
                            draggable={!isPositionFixed}
                            onDragEnd={(e) => setMarkerPosition(e.nativeEvent.coordinate)}
                        />
                    </MapView>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title={isPositionFixed ? "Modifier la position" : "Fixer la position"}
                        onPress={handleFixPosition}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Marge autour du conteneur
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    mapContainer: {
        height: 300, // Hauteur fixe pour le conteneur de la carte
        borderRadius: 10, // Coins arrondis pour le conteneur
        overflow: 'hidden', // Pour s'assurer que la carte ne dépasse pas du conteneur
        backgroundColor: '#f0f0f0', // Ajout d'un fond pour visualiser le conteneur
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        marginTop: 10, // Marge en haut pour séparer le bouton de la carte
    },
});