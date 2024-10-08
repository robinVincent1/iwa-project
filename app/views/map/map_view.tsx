

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MapView, { Callout, Marker } from "react-native-maps";
import React, { useRef, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

import Slider from "@react-native-community/slider";
import map_view_styles from "./map_view_style";
import { renderRating } from "../../utils/renderRating";
import useEmplacementViewModel from "../../viewModels/emplacement_viewModel";


const cities = require("../../assets/cities.json");

export default function LocationMapView() {
  const mapRef = useRef<any>();
  const [query, setQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [locationGranted, setLocationGranted] = useState(false);
  const [radius, setRadius] = useState(10);
  const [userLocation, setUserLocation] = useState(null);
  const [showSlider, setShowSlider] = useState(false);
  const [visibleMarkers, setVisibleMarkers] = useState([]);
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const navigation = useNavigation();

  // Utilisation du ViewModel
  const { emplacements, loading, error } = useEmplacementViewModel();

  const INITIAL_REGION = {
    latitude: 43.6,
    longitude: 3.8833,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  };

  const ZOOM_THRESHOLD = {
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
      setLocationGranted(true);

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    })();
  }, []);

  const onMarkerSelected = (marker: any) => {
    mapRef.current.animateToRegion({
      latitude: marker.latitude,
      longitude: marker.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const onCalloutSelected = (marker: any) => {
    navigation.navigate("EmplacementDetails", { marker });
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
      mapRef.current.animateToRegion(
        {
          latitude: parseFloat(city.latitude),
          longitude: parseFloat(city.longitude),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    }
    setQuery(city.name);
    setFilteredCities([]);
  };

  const handleOutsidePress = () => {
    setFilteredCities([]);
    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setShowSlider(false);
  };

  const centerUserLocation = async () => {
    if (locationGranted) {
      let location = await Location.getCurrentPositionAsync({});
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    } else {
      Alert.alert("Location permission not granted");
    }
  };

  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  const filterMarkersByRadius = () => {
    if (!userLocation) return emplacements;
    return emplacements.filter((marker) => {
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
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const onRegionChangeComplete = (region) => {
    if (!showSlider) {
      const isZoomedIn =
        region.latitudeDelta < ZOOM_THRESHOLD.latitudeDelta &&
        region.longitudeDelta < ZOOM_THRESHOLD.longitudeDelta;
      setIsZoomedIn(isZoomedIn);

      if (isZoomedIn) {
        const filteredMarkers = emplacements.filter((marker) => {
          return (
            marker.coordonnees.latitude >=
              region.latitude - region.latitudeDelta / 2 &&
            marker.coordonnees.latitude <=
              region.latitude + region.latitudeDelta / 2 &&
            marker.coordonnees.longitude >=
              region.longitude - region.longitudeDelta / 2 &&
            marker.coordonnees.longitude <=
              region.longitude + region.longitudeDelta / 2
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
  }, [radius, userLocation, showSlider, emplacements]);

  const PriceBubble = ({ price }) => (
    <View style={map_view_styles.bubble}>
      <Text style={map_view_styles.priceText}>{price}€</Text>
    </View>
  );

  // Affichage du chargement ou de l'erreur
  if (loading) {
    return <Text>Chargement des emplacements...</Text>;
  }

  if (error) {
    return <Text>Erreur : {error}</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={map_view_styles.container}>
        <View style={map_view_styles.autocompleteWrapper}>
          <Ionicons
            name="search"
            size={20}
            color="black"
            style={map_view_styles.searchIcon}
          />
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
              maximumValue={500}
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
          {visibleMarkers.map((emplacement) => (
            <Marker
              key={emplacement.id_emplacement}
              coordinate={emplacement.coordonnees}
            >
              <PriceBubble price={emplacement.tarif} />
              <Callout onPress={() => onCalloutSelected(emplacement)}>
                <View>
                  <Text style={map_view_styles.calloutTitle}>
                    {emplacement.localisation}
                  </Text>
                  <View>
                    <Image
                      source={{ uri: emplacement.photos[0] }}
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
                      {renderRating(emplacement.moyenneAvis)}
                    </Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
        <TouchableOpacity
          style={map_view_styles.locationButton}
          onPress={centerUserLocation}
        >
          <Ionicons name="locate" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={map_view_styles.sliderToggleButton}
          onPress={() => setShowSlider(!showSlider)}
        >
          <Ionicons name="options" size={24} color="white" />
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}
