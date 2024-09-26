import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LocationMapView from '../views/map_view';
import EmplacementDetails from '../views/emplacement_details_view'; 
import Reservation_details from '../views/profil/Reservation_details';
import Emplacement_details from '../views/profil/Emplacement_details';


const Stack = createStackNavigator();

export default function MapStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Map">
            <Stack.Screen name="Map" component={LocationMapView} />
            <Stack.Screen name="EmplacementDetails" component={EmplacementDetails} />
            <Stack.Screen name="Reservation_detail" component={Reservation_details} />
            <Stack.Screen name="Emplacement_detail" component={Emplacement_details} />

        </Stack.Navigator>
    );
}