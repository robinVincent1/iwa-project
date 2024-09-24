import { StyleSheet,Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps'; 
import React, { useRef } from 'react';

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
            name: "Montpellier"
        },
        {
            latitude: 43.3,
            longitude: 3.8833,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            name: "Montpellier"
        },
        {
            latitude: 43.5,
            longitude: 3.8833,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            name: "Montpellier"
        },
        {
            latitude: 43.7,
            longitude: 3.8833,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
            name: "Montpellier"
        },
    ]

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
                    />
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