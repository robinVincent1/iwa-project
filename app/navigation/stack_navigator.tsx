import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LocationMapView from '../views/map_view';
import EmplacementDetails from '../views/emplacement_details_view'; 

const Stack = createStackNavigator();

export default function MapStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Map">
            <Stack.Screen name="Map" component={LocationMapView} />
            <Stack.Screen name="EmplacementDetails" component={EmplacementDetails} />
        </Stack.Navigator>
    );
}