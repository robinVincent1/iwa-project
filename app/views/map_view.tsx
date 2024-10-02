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
  } from "react-native";
  import { StatusBar } from "expo-status-bar";
  import MapView, { Callout, Marker } from "react-native-maps";
  import React, { useRef, useState, useEffect } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import * as Location from "expo-location";
  import { useNavigation } from "@react-navigation/native";
  import { renderRating } from "../utils/renderRating";
  import { useDispatch } from "react-redux";
  import Slider from "@react-native-community/slider";
  import map_view_styles from "./map_view_style";
  import { useRoute } from "@react-navigation/native";
  
  const cities = require("../assets/cities.json");
  
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
  
  export default function LocationMapView({ route }) {
    const mapRef = useRef<any>(); // Changer le type plus tard
    const textInputRef = useRef(null);
    const [query, setQuery] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [locationGranted, setLocationGranted] = useState(false);
    const [radius, setRadius] = useState(10); // Rayon en kilomètres
    const [userLocation, setUserLocation] = useState(null);
    const [showSlider, setShowSlider] = useState(false); // État pour contrôler la visibilité du slider
    const [isZoomedIn, setIsZoomedIn] = useState(false); // État pour contrôler le niveau de zoom
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    useEffect(() => {
      const { fromHomepageSearch = false } = route.params || {};
      if (fromHomepageSearch && textInputRef.current) {
        textInputRef.current.focus();
      }
    }, [route.params]);
  
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
  
    const emplacements: Emplacement[] = [
      {
        id_emplacement: '1',
        localisation: 'Montpellier',
        caracteristique: 'Proche du centre-ville',
        equipement: ['Wi-Fi', 'Piscine'],
        tarif: 50,
        disponible: true,
        moyenneAvis: 4.7,
        photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
        coordonnees: {
          latitude: 43.6,
          longitude: 3.8833,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          name: "Montpellier Centre",
          rating: 4.7,
        },
      },
      {
        id_emplacement: '2',
        localisation: 'Montpellier',
        caracteristique: 'Proche des plages',
        equipement: ['Parking', 'Animaux acceptés'],
        tarif: 80,
        disponible: false,
        moyenneAvis: 3.8,
        photos: ['https://example.com/photo3.jpg', 'https://example.com/photo4.jpg'],
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
        id_emplacement: '3',
        localisation: 'Montpellier',
        caracteristique: 'Quartier calme',
        equipement: ['Terrasse', 'Barbecue'],
        tarif: 60,
        disponible: true,
        moyenneAvis: 4.2,
        photos: ['https://example.com/photo5.jpg', 'https://example.com/photo6.jpg'],
        coordonnees: {
          latitude: 43.61,
          longitude: 3.88,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          name: "Montpellier Quartier Calme",
          rating: 4.2,
        },
      }
    ];
  
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
  
    const onMarkerSelected = (emplacement: Emplacement) => {
      mapRef.current.animateToRegion({
        latitude: emplacement.coordonnees.latitude,
        longitude: emplacement.coordonnees.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    };
  
    const onCalloutSelected = (emplacement: Emplacement) => {
      navigation.navigate("EmplacementDetails", { emplacement });
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
        ); // Ajoutez une durée pour l'animation
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
  
    const onRegionChangeComplete = (region) => {
      if (!showSlider) {
        const isZoomedIn =
          region.latitudeDelta < ZOOM_THRESHOLD.latitudeDelta &&
          region.longitudeDelta < ZOOM_THRESHOLD.longitudeDelta;
        setIsZoomedIn(isZoomedIn);
      }
    };
  
    useEffect(() => {
      if (showSlider) {
        // Vous pouvez ajouter d'autres logiques ici si nécessaire
      }
    }, [radius, userLocation, showSlider]);
  
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
              ref={textInputRef}
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
                onPress={() => onMarkerSelected(emplacement)}
              >
                <Callout onPress={() => onCalloutSelected(emplacement)}>
                  <View>
                    <Text style={map_view_styles.calloutTitle}>
                      {emplacement.localisation}
                    </Text>
                    <Text style={map_view_styles.calloutDescription}>
                      {emplacement.caracteristique}
                    </Text>
                    <Text style={map_view_styles.calloutRating}>
                      {renderRating(emplacement.moyenneAvis)}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
  const styles = StyleSheet.create({
    calloutTitle: {
      fontWeight: "bold",
    },
    calloutDescription: {
      marginTop: 5,
    },
    calloutRating: {
      marginTop: 5,
      fontStyle: "italic",
    },
  });
  