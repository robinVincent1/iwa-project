import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Callout, Marker } from 'react-native-maps'; 
import React, { useRef, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { renderRating } from '../../utils/renderRating';
import { useDispatch } from 'react-redux';
import Slider from '@react-native-community/slider';
import map_view_styles from './map_view_style';

const cities = require('../../assets/cities.json');

export type Emplacement = {
  id_emplacement: string;
  localisation: string;
  caracteristique: string;
  equipement: string[];
  tarif: number;
  disponible: boolean;
  moyenneAvis: number;
  photos: string[]; // Liste d'URLs de photos
  coordonnees: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
    name: string;
    rating: number;
  };
};

export default function LocationMapView() {

    const mapRef = useRef<any>(); //Changer le type plus tard
    const [query, setQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [locationGranted, setLocationGranted] = useState(false);
    const [radius, setRadius] = useState(10); // Rayon en kilomètres
    const [userLocation, setUserLocation] = useState(null);
    const [showSlider, setShowSlider] = useState(false); // État pour contrôler la visibilité du slider
    const [visibleMarkers, setVisibleMarkers] = useState([]);
    const [isZoomedIn, setIsZoomedIn] = useState(false); // État pour contrôler le niveau de zoom
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const INITIAL_REGION = {
        latitude: 43.6,
        longitude: 3.8833,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    }

    const ZOOM_THRESHOLD = {
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
    };

    const emplacements: Emplacement[] = [
      {
        id_emplacement: "2",
        localisation: "Montpellier",
        caracteristique: "Proche des plages",
        equipement: ["Parking", "Animaux acceptés"],
        tarif: 80,
        disponible: false,
        moyenneAvis: 3.8,
        photos: [
          "https://example.com/photo3.jpg",
          "https://example.com/photo4.jpg",
        ],
        coordonnees: {
          latitude: 43.58,
          longitude: 3.9,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          name: "Montpellier Plages",
          rating: 3.8,
        },
      },
      {
        id_emplacement: "3",
        localisation: "Montpellier",
        caracteristique: "Quartier calme",
        equipement: ["Terrasse", "Barbecue"],
        tarif: 60,
        disponible: true,
        moyenneAvis: 4.2,
        photos: [
          "https://example.com/photo5.jpg",
          "https://example.com/photo6.jpg",
        ],
        coordonnees: {
          latitude: 43.61,
          longitude: 3.88,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          name: "Montpellier Quartier Calme",
          rating: 4.2,
        },
      },
    ];

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
        if (!userLocation) return emplacements;
        return emplacements.filter(marker => {
            const distance = getDistanceFromLatLonInKm(
                userLocation.latitude,
                userLocation.longitude,
                marker.coordonnees.latitude,
                marker.coordonnees.longitude
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

    const onRegionChangeComplete = (region) => {
        if (!showSlider) {
            const isZoomedIn = region.latitudeDelta < ZOOM_THRESHOLD.latitudeDelta && region.longitudeDelta < ZOOM_THRESHOLD.longitudeDelta;
            setIsZoomedIn(isZoomedIn);

            if (isZoomedIn) {
                const filteredMarkers = emplacements.filter(marker => {
                    return (
                        marker.coordonnees.latitude >= region.latitude - region.latitudeDelta / 2 &&
                        marker.coordonnees.latitude <= region.latitude + region.latitudeDelta / 2 &&
                        marker.coordonnees.longitude >= region.longitude - region.longitudeDelta / 2 &&
                        marker.coordonnees.longitude <= region.longitude + region.longitudeDelta / 2
                    );
                });
                setVisibleMarkers(filteredMarkers);
            } else {
                setVisibleMarkers([]);
            }
        }
    };

    useEffect(() => {
        if (showSlider) {
            const filteredMarkers = filterMarkersByRadius();
            setVisibleMarkers(filteredMarkers);
        }
    }, [radius, userLocation, showSlider]);

    const PriceBubble = ({ price }) => (
      <View style={map_view_styles.bubble}>
        <Text style={map_view_styles.priceText}>{price}€</Text>
      </View>
    );

    return (
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={map_view_styles.container}>
              <View style={map_view_styles.autocompleteWrapper}>
                  <Ionicons name="search" size={20} color="black" style={map_view_styles.searchIcon} />
                  <TextInput
                      style={map_view_styles.textInput}
                      value={query}
                      onChangeText={handleSearch}
                      placeholder="Entrez le nom d’une ville"
                      onFocus={handleFocus}
                  />
              </View>
              {showSlider && (
                  <View style={map_view_styles.sliderContainer}>
                      <Text>Rayon: {radius} km</Text>
                      <Slider
                          style={map_view_styles.slider}
                          minimumValue={1}
                          maximumValue={500} // À modifier
                          step={1}
                          value={radius}
                          onValueChange={setRadius}
                      />
                  </View>
              )}
              <MapView
                  style={map_view_styles.map}
                  initialRegion={INITIAL_REGION}
                  ref={mapRef}
                  showsUserLocation={true}
                  onRegionChangeComplete={onRegionChangeComplete}
              >
                  {emplacements.map((emplacement) => (
                      <Marker
                          key={emplacement.id_emplacement}
                          coordinate={emplacement.coordonnees}
                      >
                          <PriceBubble price={emplacement.tarif} />
                          <Callout onPress={() => onCalloutSelected(emplacement)}>
                              <View style={map_view_styles.calloutContainer}>
                                  <Text style={map_view_styles.calloutTitle}>
                                      {emplacement.localisation}
                                  </Text>
                                  <View >
                                      <Image
                                          source={{ uri: emplacement.photos[0] }} // Utilise la première photo
                                          style={map_view_styles.image}
                                      />
                                  </View>
                                  <Text style={map_view_styles.calloutDescription}>
                                      {emplacement.caracteristique}
                                  </Text>
                                  <Text style={map_view_styles.priceText}>
                                      {emplacement.tarif}€ / nuit
                                  </Text>
                                  <View style={map_view_styles.ratingContainer}>
                                      <Text style={map_view_styles.ratingText}>
                                          {emplacement.moyenneAvis} / 5
                                      </Text>
                                      {renderRating(emplacement.moyenneAvis)}
                                  </View>
                              </View>
                          </Callout>
                      </Marker>
                  ))}
              </MapView>
              {filteredCities.length > 0 && (
                  <View style={map_view_styles.suggestionsContainer}>
                      <FlatList
                          data={filteredCities}
                          renderItem={({ item }) => (
                              <TouchableOpacity onPress={() => handleSelectCity(item)}>
                                  <View style={map_view_styles.itemContainer}>
                                      <Ionicons name="compass" size={20} color="black" />
                                      <Text style={map_view_styles.autocompleteItemText}>{item.city_code}</Text>
                                  </View>
                              </TouchableOpacity>
                          )}
                          keyExtractor={(item) => item.city_code}
                          style={map_view_styles.list}
                      />
                  </View>
              )}
              <TouchableOpacity style={map_view_styles.locationButton} onPress={centerUserLocation}>
                  <Ionicons name="locate" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={map_view_styles.sliderToggleButton} onPress={() => setShowSlider(!showSlider)}>
                  <Ionicons name="options" size={24} color="white" />
              </TouchableOpacity>
          </View>
      </TouchableWithoutFeedback>
  );  
}

