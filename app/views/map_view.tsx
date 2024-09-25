import { StyleSheet,Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Callout, Marker } from 'react-native-maps'; 
import React, { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function LocationMapView() {

    const mapRef = useRef<any>(); //Changer le type plus tard

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
            rating:0
        },
        {
            latitude: 43.5,
            longitude: 3.8833,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            name: "Montpellier 3",
            rating:2.3

        },
        {
            latitude: 43.7,
            longitude: 3.8833,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            name: "Montpellier 4",
            rating:3.5
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
        console.log(marker.name);
    }

    const renderRating = (rating: number) => {
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
    }

    return (
        <View style={styles.container}>
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
                        <Callout onPress = {() => onCalloutSelected(marker)}>
                            <View>
                                <Text>{marker.name}</Text>
                                {renderRating(marker.rating)}
                                <Text>Cliquez pour réserver !</Text>
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
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });