import { StyleSheet,Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView from 'react-native-maps'; 

export default function LocationMapView() {
    return (
        <View style={styles.container}>
            <MapView
            style={styles.map}
            region={{
                latitude: 43.6,
                longitude: 3.8833,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }}
            >
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